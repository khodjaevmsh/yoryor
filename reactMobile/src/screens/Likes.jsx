import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, FlatList, RefreshControl } from 'react-native'
import { COLOR } from '../utils/colors'
import { baseAxios } from '../hooks/requests'
import { LIKES } from '../urls'
import { GlobalContext } from '../context/GlobalContext'
import LikeItem from '../components/LikeItem'
import ActivityIndicator from '../components/common/ActivityIndicator'
import { showToast } from '../components/common/Toast'

export default function Likes() {
    const [loading, setLoading] = useState(false)
    const [likes, setLikes] = useState([])
    const [page, setPage] = useState(1)
    const [nextPage, setNextPage] = useState(null)
    const [refreshing, setRefreshing] = useState(false)
    const { profile: receiver } = useContext(GlobalContext)

    useEffect(() => {
        async function fetchLikes() {
            try {
                setLoading(true)
                const response = await baseAxios.get(LIKES, { params: { page, receiver: receiver.id } })
                if (!refreshing) {
                    setLikes((prevData) => [...prevData, ...response.data.results])
                } else {
                    setLikes(response.data.results)
                }
                setNextPage(response.data.next !== null)
            } catch (error) {
                console.log(error.response.data)
                showToast('error', 'Oops!', 'Nomalum xatolik.')
            } finally {
                setRefreshing(false)
                setLoading(false)
            }
        }
        fetchLikes()
    }, [receiver, page])

    function handleRefresh() {
        setRefreshing(true)
        setPage(1)
    }

    function handleLoadMore() {
        if (nextPage && !loading && !refreshing) {
            setPage((prevPage) => prevPage + 1)
        }
    }

    return (
        <FlatList
            data={likes}
            renderItem={({ item }) => <LikeItem item={item} />}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.2}
            ListFooterComponent={() => (loading && !refreshing ? <ActivityIndicator padding /> : null)}
            refreshControl={(
                <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={COLOR.lightGrey} />
            )} />

    )
}

const styles = StyleSheet.create({})
