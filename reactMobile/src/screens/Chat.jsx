import React, { useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { baseAxios, wsDomain } from '../hooks/requests'
import { ROOMS } from '../urls'
import { GlobalContext } from '../context/GlobalContext'
import RoomItem from '../components/RoomItem'
import { showToast } from '../components/common/Toast'
import HeaderLeft from '../components/common/HeaderLeft'
import EmptyChat from '../components/EmptyChat'
import SkeletonChat from '../components/SkeletonChat'

export default function Chat() {
    const [loading, setLoading] = useState(true)
    const [rooms, setRooms] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
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
                    setRooms((prevData) => [...prevData, ...response.data.results])
                    setTotalPages(response.data.totalPages)
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
                console.log('WebSocket connected for room')
                reconnectInterval = 1000 // Reset reconnect interval on successful connection
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

            ws.onerror = () => {
                console.log('WebSocket error...')
            }

            ws.onclose = () => {
                console.log('WebSocket disconnected for room')
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
        if (!loading && page < totalPages) {
            setPage(page + 1)
        }
    }

    return (
        <FlatList
            data={rooms}
            renderItem={({ item }) => <RoomItem room={item} />}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.contentContainer}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.2}
            showsVerticalScrollIndicator={false}
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
