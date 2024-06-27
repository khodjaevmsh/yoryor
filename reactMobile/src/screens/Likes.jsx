import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, FlatList, RefreshControl, View, Text } from 'react-native'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native'
import { COLOR } from '../utils/colors'
import { baseAxios } from '../hooks/requests'
import { LIKES } from '../urls'
import { GlobalContext } from '../context/GlobalContext'
import LikeItem from '../components/LikeItem'
import ActivityIndicator from '../components/common/ActivityIndicator'
import { showToast } from '../components/common/Toast'
import WantMoreLikes from '../components/WantMoreLikes'

export default function Likes() {
    const [loading, setLoading] = useState(false)
    const [likes, setLikes] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [refreshing, setRefreshing] = useState(false)
    const { profile: receiver, numOfLikes } = useContext(GlobalContext)
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ marginLeft: 18 }}>
                    <Text style={{ fontSize: normalize(22), fontWeight: '700' }}>Likes</Text>
                </View>
            ),
        })
    }, [navigation])

    useEffect(() => {
        async function fetchLikes() {
            try {
                setLoading(true)
                const response = await baseAxios.get(LIKES, { params: { receiver: receiver.id, page } })
                if (!refreshing) {
                    setLikes((prevData) => [...prevData, ...response.data.results])
                } else {
                    setLikes([])
                }
                setTotalPages(response.data.totalPages)
            } catch (error) {
                showToast('error', 'Oops!', 'Nomalum xatolik.')
            } finally {
                setLoading(false)
                setRefreshing(false)
            }
        }

        fetchLikes()
    }, [receiver, refreshing, page])

    function handleRefresh() {
        setRefreshing(true)
        setPage(1)
    }

    const handleLoadMore = () => {
        if (!loading && !refreshing && page < totalPages) {
            setPage(page + 1) // Load next page
        }
    }

    return (
        <>
            <View style={styles.likesCount}>
                <Text style={styles.likes}>{numOfLikes} likes</Text>
            </View>
            <FlatList
                data={likes}
                renderItem={({ item }) => <LikeItem item={item} />}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                onEndReached={handleLoadMore}
                contentContainerStyle={styles.contentContainer}
                onEndReachedThreshold={0.2}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={() => (loading && !refreshing ? <ActivityIndicator padding /> : null)}
                refreshControl={(
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={COLOR.lightGrey} />
                )}
                ListEmptyComponent={!loading && !refreshing ? (
                    <View style={styles.emptyContainer}>
                        <WantMoreLikes />
                    </View>
                ) : null}
            />
        </>
    )
}

const styles = StyleSheet.create({
    likesCount: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLOR.extraLightGrey,
        paddingVertical: 18,
    },
    likes: {
        color: COLOR.black,
        fontWeight: '500',
        fontSize: normalize(18),
    },
    contentContainer: {
        flexGrow: 1,
        marginHorizontal: 8,
        paddingTop: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
