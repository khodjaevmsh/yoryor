import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native'
import Container from '../components/common/Container'
import { COLOR } from '../utils/colors'
import { baseAxios, webSocketUrl } from '../hooks/requests'
import { ROOMS } from '../urls'
import { GlobalContext } from '../context/GlobalContext'
import RoomItem from '../components/RoomItem'
import NotFound from '../components/NotFound'

export default function Chat() {
    const [loading, setLoading] = useState(true)
    const [rooms, setRooms] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [page, setPage] = useState(1)
    const [numPages, setNumPages] = useState(1)
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
                const roomsResponse = await baseAxios.get(ROOMS, { params: { page } })
                setRooms(roomsResponse.data.results)

                // Initialize WebSocket connection for each room
                roomWebsockets = roomsResponse.data.results.map((room) => createWebSocket(room.id))
            } catch (error) {
                console.log(error.response.data)
            } finally {
                setLoading(false)
                setRefreshing(false)
                setRender(false)
            }
        }

        if (page <= numPages) {
            fetchRooms()
        }

        return () => {
            // Cleanup WebSocket connections on component unmount
            roomWebsockets.forEach((ws) => ws.close())
        }
        // eslint-disable-next-line max-len
    }, [profile.id, refreshing, render, createWebSocket, setRooms, setLoading, setRefreshing, setRender, page, numPages])

    const renderItem = useCallback(({ item }) => <RoomItem item={item} />, [])

    return (
        <Container containerStyle={{ marginTop: 0 }} keyboardDismiss={false}>
            <FlatList
                data={rooms}
                style={{ flexGrow: 1 }}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={() => setPage((prevPage) => prevPage + 1)}
                onEndReachedThreshold={0.8}
                ListFooterComponent={() => (loading && !refreshing ? <ActivityIndicator size="large" /> : null)}
                refreshControl={(
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => {
                            setRefreshing(true)
                            setRooms([])
                            setPage(1)
                        }}
                        tintColor={COLOR.lightGrey} />
                )}
                ListEmptyComponent={!loading && !refreshing ? (
                    <NotFound wrapperStyle={{ marginHorizontal: 18 }} />
                ) : null}
            />
        </Container>
    )
}

// const styles = StyleSheet.create({})
