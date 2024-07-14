import React, { useState, useEffect, useContext, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { KeyboardAvoidingView, View, Platform, StyleSheet } from 'react-native'
import { GlobalContext } from '../../context/GlobalContext'
import ChatDetailHeader from '../../components/ChatDetailHeader'
import { baseAxios, wsDomain } from '../../hooks/requests'
import { MESSAGES } from '../../urls'
import EmptyChatView from '../../components/EmptyChatView'
import ActivityIndicator from '../../components/common/ActivityIndicator'
import InputToolBar from '../../components/InputToolBar'
import { showToast } from '../../components/common/Toast'

export default function ChatDetail({ route }) {
    const [webSocket, setWebSocket] = useState('')
    const [loading, setLoading] = useState(true)
    const [messages, setMessages] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const { token } = useContext(GlobalContext)
    const { room, sender, receiver } = route.params

    useEffect(() => {
        let ws
        let reconnectInterval = 1000

        const connectWebSocket = () => {
            ws = new WebSocket(`${wsDomain}/${room.name}/?token=${token}`)

            ws.onopen = () => {
                setWebSocket(ws)
                reconnectInterval = 1000
            }

            ws.onmessage = (event) => {
                const newMessage = JSON.parse(event.data).message
                setMessages((previousMessages) => GiftedChat.append(previousMessages, {
                    _id: Math.random().toString(36).substr(2, 9),
                    text: newMessage.text,
                    createdAt: newMessage.createdAt,
                    user: newMessage.user,
                }))
            }

            ws.onerror = () => {
                console.log('WebSocket error...')
            }

            ws.onclose = () => {
                reconnectWebSocket()
                // showToast('success', 'Woohoo!', 'Internet qayta tiklandi')
            }
        }

        const reconnectWebSocket = () => {
            if (reconnectInterval <= 16000) {
                setTimeout(() => {
                    reconnectInterval *= 2
                    connectWebSocket()
                }, reconnectInterval)
            } else {
                console.log('WebSocket reconnect error...')
            }
        }

        connectWebSocket()

        return () => {
            if (ws && ws.readyState === WebSocket.OPEN) {
                ws.close()
            }
        }
    }, [room.name, token])

    useEffect(() => {
        async function fetchMessages() {
            try {
                setLoading(true)
                const response = await baseAxios.get(MESSAGES, { params: { room: room.id, page } })
                const messageResponse = response.data.results.map((message) => ({
                    _id: Math.random().toString(36).substr(2, 9),
                    text: message.content,
                    createdAt: message.createdAt,
                    user: { _id: message.user },
                }))
                setMessages((prevMessages) => GiftedChat.prepend(prevMessages, messageResponse))
                setTotalPages(response.data.totalPages)
            } catch (error) {
                console.log(error.response.data)
            } finally {
                setLoading(false)
            }
        }

        fetchMessages()
    }, [page])

    const onSend = useCallback((newMessage = []) => {
        const newMessageData = {
            message: newMessage[0],
            room: { id: room.id, name: room.name },
            receiver: { id: receiver.id, name: receiver.name, user: receiver.user },
        }

        if (webSocket && webSocket.readyState === WebSocket.OPEN) {
            webSocket.send(JSON.stringify(newMessageData))
        } else {
            showToast('warning', 'Oops!', 'Internet mavjudligini tekshiring')
        }
    }, [room, receiver, webSocket])

    function loadEarlierMessages() {
        if (!loading && page < totalPages) {
            setPage(page + 1)
        }
    }

    return (
        <View style={styles.container}>
            <ChatDetailHeader receiver={receiver} />
            <View style={styles.chatContainer}>
                <GiftedChat
                    messages={messages}
                    onSend={(newMessages) => onSend(newMessages)}
                    user={{ _id: sender.id, name: sender.name }}
                    timeFormat="HH:mm"
                    dateFormat="DD MMMM YYYY"
                    renderAvatar={null}
                    alwaysShowSend
                    renderInputToolbar={(props) => <InputToolBar props={props} />}
                    maxComposerHeight={200}
                    minComposerHeight={Platform.OS === 'ios' ? 38 : 38}
                    bottomOffset={15}
                    loadEarlier
                    isLoadingEarlier={loading}
                    renderLoadEarlier={() => (loading ? <ActivityIndicator padding /> : null)}
                    listViewProps={{ onEndReached: loadEarlierMessages, onEndReachedThreshold: 0.1 }}
                    renderChatEmpty={() => (!loading && messages.length <= 0 ? <EmptyChatView /> : null)}
                />
                {Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: Platform.OS === 'ios' ? 22 : 5,
    },
    chatContainer: {
        flex: 1,
    },
})
