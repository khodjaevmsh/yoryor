import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, RefreshControl, Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native'
import Container from '../components/common/Container'
import { COLOR } from '../utils/colors'
import { baseAxios, domain, webSocketUrl } from '../hooks/requests'
import { ROOMS } from '../urls'
import { GlobalContext } from '../context/GlobalContext'
import NotFound from '../components/NotFound'
import { fontSize } from '../utils/fontSizes'
import { shortenText } from '../utils/string'

export default function Chat() {
    const [loading, setLoading] = useState(false)
    const [rooms, setRooms] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [page, setPage] = useState(1)
    const [numPages, setNumPages] = useState(1)
    const { profile, token } = useContext(GlobalContext)
    const navigation = useNavigation()
    const [lastMessages, setLastMessages] = useState({})

    const createWebSocket = useCallback((roomId) => {
        const ws = new WebSocket(`ws://${webSocketUrl}/ws/chat/${roomId}/?token=${token}`)
        ws.onopen = () => console.log('WebSocket connected')
        ws.onmessage = (event) => {
            const receivedMessage = JSON.parse(event.data)
            setLastMessages((prevMessages) => ({
                ...prevMessages,
                [roomId]: receivedMessage.message.text,
            }))
        }
        ws.onclose = () => console.log('WebSocket disconnected')

        return ws
    }, [token])

    useEffect(() => {
        let roomWebsockets = []
        async function fetchRooms() {
            try {
                setLoading(true)
                const response = await baseAxios.get(ROOMS, { params: { page } })
                setRooms((prevRooms) => [...prevRooms, ...response.data.results])
                setNumPages(response.data.totalPages)

                // Initialize WebSocket connection for each room
                roomWebsockets = await response.data.results.map((room) => createWebSocket(room.id))
            } catch (error) {
                console.log(error.response.data)
            } finally {
                setLoading(false)
                setRefreshing(false)
            }
        }

        if (page <= numPages) {
            fetchRooms()
        }

        // Cleanup WebSocket connections on component unmount
        return () => {
            roomWebsockets.forEach((ws) => ws.close())
        }
    }, [page, numPages, createWebSocket, refreshing])

    const renderItem = ({ item }) => {
        const sender = item.participants.find((participant) => participant.id === profile.id)
        const receiver = item.participants.find((participant) => participant.id !== profile.id)
        const lastMessage = lastMessages[item.id] || item.message.content || 'Bu match!'

        return (
            <TouchableOpacity
                onPress={() => { navigation.navigate('ChatDetail', { room: item, sender, receiver }) }}
                style={styles.roomItemWrapper}>
                <FastImage style={styles.receiverImage} source={{
                    uri: receiver ? `${domain + receiver.images?.[0]?.image}` : null,
                    priority: FastImage.priority.medium,
                }} resizeMode={FastImage.resizeMode.cover} />
                <View style={styles.receiverMsg}>
                    <Text style={styles.receiverName}>{receiver.name}</Text>
                    <Text style={styles.receiverMsgContent}>
                        {shortenText(lastMessage, 25)}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <Container containerStyle={{ marginBottom: 0 }} keyboardDismiss={false}>
            <FlatList
                data={rooms}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={() => setPage((prevPage) => prevPage + 1)}
                onEndReachedThreshold={0.8}
                ListFooterComponent={() => (loading && !refreshing ? <ActivityIndicator size="small" /> : null)}
                showsVerticalScrollIndicator={false}
                refreshControl={(
                    <RefreshControl
                        tintColor={COLOR.lightGrey}
                        refreshing={refreshing}
                        onRefresh={() => {
                            setRefreshing(true)
                            setRooms([])
                            setPage(1)
                        }} />
                )}
                ListEmptyComponent={!loading && !refreshing ? (
                    <NotFound wrapperStyle={{ marginHorizontal: 8 }} />
                ) : null}
            />
        </Container>
    )
}

const styles = StyleSheet.create({
    roomItemWrapper: {
        flex: 1,
        borderBottomColor: COLOR.lightGrey,
        borderBottomWidth: 0.3,
        paddingVertical: 14,
        flexDirection: 'row',
        alignItems: 'center',
    },
    receiverImage: {
        width: normalize(58),
        height: normalize(58),
        borderRadius: 100,
    },
    receiverMsg: {
        flex: 1,
        paddingHorizontal: 14,
    },
    receiverName: {
        fontSize: fontSize.large,
        fontWeight: '500',
    },
    receiverMsgContent: {
        fontSize: fontSize.small,
        color: COLOR.darkGrey,
        marginTop: 4,
    },
})
