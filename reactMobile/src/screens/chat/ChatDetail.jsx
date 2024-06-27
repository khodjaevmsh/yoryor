import React, { useState, useEffect, useContext, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { KeyboardAvoidingView, View, Platform, StyleSheet } from 'react-native'
import { GlobalContext } from '../../context/GlobalContext'
import ChatDetailHeader from '../../components/ChatDetailHeader'
import { baseAxios, webSocketUrl } from '../../hooks/requests'
import { MESSAGES } from '../../urls'
import EmptyChatView from '../../components/EmptyChatView'
import ActivityIndicator from '../../components/common/ActivityIndicator'
import InputToolBar from '../../components/InputToolBar'

export default function ChatDetail({ route }) {
    const [ws, setWs] = useState('')
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [isLoadingEarlier, setIsLoadingEarlier] = useState(false)
    const { token } = useContext(GlobalContext)
    const { room, sender, receiver } = route.params

    useEffect(() => {
        const newWs = new WebSocket(`${webSocketUrl}/${room.name}/?token=${token}`)

        newWs.onopen = () => {
            console.log('WebSocket connected')
            setWs(newWs)
        }

        newWs.onmessage = (event) => {
            const newMessage = JSON.parse(event.data).message
            setMessages((previousMessages) => GiftedChat.append(previousMessages, {
                _id: Math.random().toString(36).substr(2, 9),
                text: newMessage.text,
                createdAt: newMessage.createdAt,
                user: newMessage.user,
            }))
        }

        newWs.onerror = (event) => {
            console.error('WebSocket error:', event.message)
        }

        newWs.onclose = () => {
            console.log('WebSocket disconnected')
        }

        return () => {
            if (newWs.readyState === WebSocket.OPEN) {
                newWs.close()
            }
        }
    }, [room.name, token])

    async function fetchMessages() {
        try {
            setLoading(true)
            const response = await baseAxios.get(MESSAGES, { params: { room: room.id, page } })
            const messageResponse = response.data.results.map((message) => ({
                _id: Math.random().toString(36).substr(2, 9),
                text: message.content,
                createdAt: message.timestamp,
                user: { _id: message.user },
            }))

            setMessages((prevMessages) => GiftedChat.prepend(prevMessages, messageResponse))
            setTotalPages(response.data.totalPages)
        } catch (error) {
            console.log(error.response)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMessages()
    }, [page])

    const onSend = useCallback((newMessage = []) => {
        const messageData = { room, sender, receiver, content: newMessage[0], message: newMessage[0] }

        if (ws && ws.readyState === WebSocket.OPEN) {
            // setMessages((prevMessages) => GiftedChat.prepend(prevMessages, newMessage))
            ws.send(JSON.stringify(messageData))
        } else {
            console.error('WebSocket connection not open.')
        }
    }, [ws])

    function loadEarlierMessages() {
        if (!loading && page < totalPages) {
            setIsLoadingEarlier(true)
            setPage(page + 1)
            setIsLoadingEarlier(false)
        }
    }

    return (
        <View style={styles.container}>
            <ChatDetailHeader receiver={receiver} />
            <View style={{ flex: 1 }}>
                <GiftedChat
                    messages={messages}
                    onSend={(newMessages) => onSend(newMessages)}
                    user={{ _id: sender.id }}
                    timeFormat="HH:mm"
                    dateFormat="DD MMMM YYYY"
                    renderAvatar={null}
                    alwaysShowSend
                    renderInputToolbar={(props) => <InputToolBar props={props} />}
                    maxComposerHeight={200}
                    minComposerHeight={Platform.OS === 'ios' ? 38 : 38}
                    bottomOffset={15}
                    loadEarlier
                    isLoadingEarlier={isLoadingEarlier}
                    listViewProps={{ onEndReached: loadEarlierMessages, onEndReachedThreshold: 0.1 }}
                    renderLoadEarlier={() => (loading ? <ActivityIndicator padding /> : null)}
                    renderLoading={() => (loading ? <ActivityIndicator padding /> : null)}
                    renderChatEmpty={() => (!loading && messages.length <= 0 ? <EmptyChatView /> : null)} />
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
})
