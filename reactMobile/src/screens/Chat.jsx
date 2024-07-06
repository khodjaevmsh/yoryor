import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import Container from '../components/common/Container'
import { baseAxios, wsDomain } from '../hooks/requests'
import { ROOMS } from '../urls'
import { GlobalContext } from '../context/GlobalContext'
import RoomItem from '../components/RoomItem'
import { showToast } from '../components/common/Toast'
import HeaderLeft from '../components/common/HeaderLeft'
import SkeletonChat from '../components/SkeletonChat'

export default function Chat() {
    const [loading, setLoading] = useState(true)
    const [rooms, setRooms] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const navigation = useNavigation()
    const { token } = useContext(GlobalContext)
    const isFocused = useIsFocused()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => <HeaderLeft title="Chat" />,
        })
    }, [navigation])

    useEffect(() => {
        async function fetchRooms() {
            try {
                setLoading(true)
                const response = await baseAxios.get(ROOMS, { params: { page } })
                setRooms(response.data.results)
                setTotalPages(response.data.totalPages)
            } catch (error) {
                console.log(error.response.data)
            } finally {
                setLoading(false)
            }
        }
        fetchRooms()
    }, [isFocused, page])

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
                showToast('error', 'Oops!', 'Internet mavjudligini tekshiring')
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
                showToast('error', 'Oops!', 'Internet mavjudligini tekshiring')
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

    if (loading) {
        return <SkeletonChat />
    }

    return (
        <Container containerStyle={styles.container}>
            <FlatList
                data={rooms}
                renderItem={({ item }) => <RoomItem room={item} />}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.contentContainer}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.2}
                showsVerticalScrollIndicator={false} />
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
    },
    contentContainer: {
        marginTop: 10,
    },
})
