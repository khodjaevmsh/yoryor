import React, { useEffect, useLayoutEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native'
import Container from '../components/common/Container'
import { baseAxios } from '../hooks/requests'
import { ROOMS } from '../urls'
import ActivityIndicator from '../components/common/ActivityIndicator'
import RoomItem from '../components/RoomItem'

export default function Chat() {
    const [loading, setLoading] = useState(false)
    const [rooms, setRooms] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ marginLeft: 18 }}>
                    <Text style={{ fontSize: normalize(22), fontWeight: '700' }}>Chat</Text>
                </View>
            ),
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
    }, [page])

    function handleLoadMore() {
        // Load next page
        if (!loading && page < totalPages) setPage(page + 1)
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
                ListFooterComponent={() => (loading ? <ActivityIndicator padding /> : null)}
                showsVerticalScrollIndicator={false} />
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
    },
    contentContainer: {
        marginTop: 15,
    },
})
