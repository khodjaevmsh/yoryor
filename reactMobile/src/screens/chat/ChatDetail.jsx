import React, { useState, useEffect, useContext, useCallback } from 'react'
import { GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat'
import { KeyboardAvoidingView, View, Platform, StyleSheet, ActivityIndicator, Text } from 'react-native'
import { ArrowUp } from 'react-native-feather'
import { useFocusEffect } from '@react-navigation/native'
import { GlobalContext } from '../../context/GlobalContext'
import ChatDetailHeader from '../../components/ChatDetailHeader'
import { COLOR } from '../../utils/colors'
import { baseAxios, webSocketUrl } from '../../hooks/requests'
import { MESSAGES } from '../../urls'
import EmptyChatView from '../../components/EmptyChatView'

export default function ChatDetail({ route }) {
    const [messages, setMessages] = useState([])
    const [socket, setSocket] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isLoadingEarlier, setIsLoadingEarlier] = useState(false)
    const { token, profile, setRender } = useContext(GlobalContext)
    const { room } = route.params

    const sender = room.participants.find((participant) => participant.id === profile.id)
    const receiver = room.participants.find((participant) => participant.id !== profile.id)

    useFocusEffect(
        useCallback(() => {
            setRender(true)
            return () => {
                setRender(false)
                // Cleanup if needed
            }
        }, [setRender]),
    )

    const createWebSocket = useCallback(() => {
        const ws = new WebSocket(`ws://${webSocketUrl}/ws/chat/${room.id}/?token=${token}`)
        ws.onopen = () => {
            console.log('WebSocket connected')
            setSocket(ws)
        }

        ws.onmessage = (event) => {
            const receivedMessage = JSON.parse(event.data)
            setMessages((prevMessages) => GiftedChat.append(prevMessages, receivedMessage.message))
        }

        ws.onclose = () => {
            console.log('WebSocket disconnected')
        }

        return ws
    }, [token, room.id])

    useEffect(() => {
        fetchMessages()
        const ws = createWebSocket()

        return () => {
            ws.close()
        }
    }, [createWebSocket])

    async function fetchMessages() {
        try {
            setLoading(true)
            setIsLoadingEarlier(true)
            const response = await baseAxios.get(MESSAGES, { params: { room: room.id } })
            const msgs = response.data.map((message) => ({
                _id: message.id,
                text: message.content,
                createdAt: message.timestamp,
                user: { _id: message.user },
            }))
            setMessages(msgs)
        } catch (error) {
            console.log(error.response)
        } finally {
            setLoading(false)
            setIsLoadingEarlier(false)
        }
    }

    const onSend = useCallback(
        (newMessages = []) => {
            if (socket) {
                socket.send(JSON.stringify({ message: {
                    ...newMessages[0],
                    receiver: receiver.id,
                } }))
            } else {
                console.error('WebSocket not connected. Message not sent.')
            }
        },
        [socket, receiver],
    )

    const isCloseToTop = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToTop = 80
        return contentSize.height - layoutMeasurement.height - paddingToTop <= contentOffset.y
    }

    return (
        <View style={styles.container}>
            <ChatDetailHeader receiver={receiver} />
            <View style={{ flex: 1 }}>
                <GiftedChat
                    messages={messages}
                    onSend={(newMessages) => onSend(newMessages)}
                    user={{ _id: sender.id }}
                    renderInputToolbar={(props) => (
                        <InputToolbar {...props} containerStyle={styles.inputToolBar} />
                    )}
                    textInputStyle={styles.textInputStyle}
                    alwaysShowSend
                    renderSend={(props) => (
                        <Send {...props}>
                            <View style={styles.sendIcon}>
                                <ArrowUp strokeWidth={2.3} color={COLOR.black} />
                            </View>
                        </Send>
                    )}
                    // onLoadEarlier={fetchMessages}
                    isLoadingEarlier={isLoadingEarlier}
                    timeFormat="HH:mm"
                    dateFormat="DD.MM.YYYY"
                    renderAvatar={() => null}
                    showAvatarForEveryMessage
                    bottomOffset={15}
                    renderLoading={() => (loading ? <ActivityIndicator size="small" color={COLOR.darkGrey} /> : null)}
                    listViewProps={{
                        scrollEventThrottle: 80,
                        onScroll: ({ nativeEvent }) => {
                            if (isCloseToTop(nativeEvent) && !isLoadingEarlier) {
                                fetchMessages() // Load more messages when close to the top
                            }
                        },
                    }}
                    renderChatEmpty={() => (!loading ? <EmptyChatView /> : null)} />
            </View>

            {Platform.OS === 'android' && <KeyboardAvoidingView behavior="height" />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: Platform.OS === 'ios' ? 22 : 5,
    },
    inputToolBar: {
        paddingBottom: 5,
        borderTopWidth: 0,
    },
    textInputStyle: {
        paddingTop: 9,
        paddingLeft: 14,
        backgroundColor: COLOR.white,
        borderRadius: 18,
        overflow: 'hidden',
        marginLeft: 15,
        borderColor: COLOR.lightGrey,
        borderWidth: 0.8,
    },
    sendIcon: {
        backgroundColor: COLOR.lightGrey,
        borderRadius: 50,
        padding: Platform.OS === 'ios' ? 5 : 6,
        marginRight: 15,
        marginLeft: 12,
    },
})
