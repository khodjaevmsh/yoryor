import React, { useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, FlatList, View, Text } from 'react-native'
import normalize from 'react-native-normalize'
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native'
import { COLOR } from '../utils/colors'
import { baseAxios } from '../hooks/requests'
import { LIKES, COUNT_OF_LIKES } from '../urls'
import { GlobalContext } from '../context/GlobalContext'
import LikeItem from '../components/LikeItem'
import WantMoreLikes from '../components/WantMoreLikes'
import HeaderLeft from '../components/common/HeaderLeft'
import SkeletonLikes from '../components/SkeletonLikes'
import ActivityIndicator from '../components/common/ActivityIndicator'

export default function Likes() {
    const [loading, setLoading] = useState(true)
    const [likes, setLikes] = useState([])
    const [count, setCount] = useState(0)
    const [hasMore, setHasMore] = useState(false)
    const [page, setPage] = useState(1)
    const { profile: receiver } = useContext(GlobalContext)
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => <HeaderLeft title="Likes" />,
        })
    }, [navigation])

    useFocusEffect(
        useCallback(() => {
            async function fetchLikes() {
                try {
                    setLoading(true)
                    const response = await baseAxios.get(LIKES, { params: { receiver: receiver.id, page } })
                    setLikes((prevLikes) => {
                        // Create a set of unique likes to prevent duplicates
                        const newLikes = response.data.results.filter(
                            (newLike) => !prevLikes.some((prevLike) => prevLike.id === newLike.id),
                        )
                        return [...prevLikes, ...newLikes]
                    })
                    setHasMore(response.data.next !== null)

                    const countResponse = await baseAxios.get(COUNT_OF_LIKES, { params: { receiver: receiver.id } })
                    setCount(countResponse.data.count)
                } catch (error) {
                    console.log(error.response.data)
                } finally {
                    setLoading(false)
                }
            }
            fetchLikes()
        }, [page]),
    )

    function handleLoadMore() {
        if (!loading && hasMore) {
            setPage((prevPage) => prevPage + 1)
        }
    }

    return (
        <>
            <View style={styles.headerWrapper}>
                <Text style={styles.count}>{count} likes</Text>
            </View>

            <FlatList
                data={likes}
                renderItem={({ item }) => <LikeItem item={item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                onEndReached={handleLoadMore}
                contentContainerStyle={styles.contentContainerStyle}
                onEndReachedThreshold={0.1}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={loading ? <ActivityIndicator padding /> : null}
                ListEmptyComponent={!loading ? <WantMoreLikes /> : <SkeletonLikes />} />
        </>
    )
}

const styles = StyleSheet.create({
    headerWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLOR.extraLightGrey,
        paddingVertical: 18,
    },
    count: {
        color: COLOR.black,
        fontWeight: '500',
        fontSize: normalize(18),
    },
    contentContainerStyle: {
        flexGrow: 1,
        marginHorizontal: 4,
        paddingTop: 15,
    },
    emptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})
