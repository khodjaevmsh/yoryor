import React, { useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native'
import { baseAxios, wsDomain } from '../hooks/requests'
import { ROOMS } from '../urls'
import { GlobalContext } from '../context/GlobalContext'
import RoomItem from '../components/RoomItem'
import { showToast } from '../components/common/Toast'
import HeaderLeft from '../components/common/HeaderLeft'
import EmptyChat from '../components/EmptyChat'
import SkeletonChat from '../components/SkeletonChat'
import ActivityIndicator from '../components/common/ActivityIndicator'

export default function Chat() {
    const [loading, setLoading] = useState(true)
    const [rooms, setRooms] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(false)
    const navigation = useNavigation()
    const { token } = useContext(GlobalContext)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => <HeaderLeft title="Chat" />,
        })
    }, [navigation])

    useFocusEffect(
        useCallback(() => {
            async function fetchRooms() {
                try {
                    setLoading(true)
                    const response = await baseAxios.get(ROOMS, { params: { page } })
                    setRooms((prevRooms) => {
                        const newRooms = response.data.results.filter(
                            (newRoom) => !prevRooms.some((prevRoom) => prevRoom.id === newRoom.id),
                        )
                        return [...prevRooms, ...newRooms]
                    })
                    setHasMore(response.data.next !== null)
                } catch (error) {
                    console.log(error.response.data)
                } finally {
                    setLoading(false)
                }
            }
            fetchRooms()
        }, [page]),
    )

    useEffect(() => {
        let ws
        let reconnectInterval = 1000

        const connectWebSocket = () => {
            ws = new WebSocket(`${wsDomain}/rooms/?token=${token}`)

            ws.onopen = () => {
                reconnectInterval = 1000
            }

            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data)
                    if (data) {
                        setRooms((prevRooms) => prevRooms.map((prevRoom) => (
                            prevRoom.id === data.room.id ? { ...prevRoom, ...data } : prevRoom
                        )))
                    }
                } catch (error) {
                    showToast('error', 'Oops!', 'Nomalum xatolik')
                }
            }

            ws.onerror = () => {}

            ws.onclose = () => {
                reconnectWebSocket()
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
            if (ws.readyState === WebSocket.OPEN) {
                ws.close()
            }
        }
    }, [token])

    function handleLoadMore() {
        if (!loading && hasMore) {
            setPage((prevPage) => prevPage + 1)
        }
    }

    return (
        <FlatList
            data={rooms}
            renderItem={({ item }) => <RoomItem room={item} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.contentContainer}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.1}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={loading ? <ActivityIndicator padding /> : null}
            ListEmptyComponent={!loading ? <EmptyChat /> : <SkeletonChat />} />
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        flexGrow: 1,
        paddingVertical: 10,
        marginHorizontal: 16,
    },
})
