import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native'
import Container from '../components/common/Container'
import { COLOR } from '../utils/colors'
import { baseAxios, webSocketUrl } from '../hooks/requests'
import { ROOMS } from '../urls'
import { GlobalContext } from '../context/GlobalContext'
import RoomItem from '../components/RoomItem'

export default function Chat() {
    const [loading, setLoading] = useState(true)
    const [rooms, setRooms] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const { profile, token, render, setRender } = useContext(GlobalContext)

    const createWebSocket = useCallback((roomId) => {
        const ws = new WebSocket(`ws://${webSocketUrl}/ws/chat/${roomId}/?token=${token}`)
        ws.onopen = () => {
            console.log('WebSocket connected')
        }

        ws.onmessage = (event) => {
            const receivedMessage = JSON.parse(event.data)
            setRooms((prevRooms) => prevRooms.map((room) => (room.id === roomId
                ? {
                    ...room,
                    lastMessage: receivedMessage.message.text,
                    unreadMessageCount: receivedMessage.unread_message_count,
                }
                : room)))
            setRender(true)
        }

        ws.onclose = () => {
            console.log('WebSocket disconnected')
        }

        return ws
    }, [token, setRooms, setRender])

    useEffect(() => {
        let roomWebsockets = []

        async function fetchRooms() {
            try {
                const roomsResponse = await baseAxios.get(ROOMS)
                setRooms(roomsResponse.data)

                // Initialize WebSocket connection for each room
                roomWebsockets = roomsResponse.data.map((room) => createWebSocket(room.id))
            } catch (error) {
                console.log(error.response.data)
            } finally {
                setLoading(false)
                setRefreshing(false)
                setRender(false)
            }
        }

        fetchRooms()

        return () => {
            // Cleanup WebSocket connections on component unmount
            roomWebsockets.forEach((ws) => ws.close())
        }
    }, [profile.id, refreshing, render, createWebSocket, setRooms, setLoading, setRefreshing, setRender])

    const renderItem = useCallback(({ item }) => <RoomItem item={item} />, [])

    if (loading && !refreshing) {
        return <ActivityIndicator size="small" />
    }

    return (
        <Container containerStyle={{ marginTop: 0 }} keyboardDismiss={false}>
            <FlatList
                data={rooms}
                style={{ flexGrow: 1 }}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                refreshControl={(
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => setRefreshing(true)}
                        tintColor={COLOR.grey} />
                )} />
        </Container>
    )
}

// const styles = StyleSheet.create({})
