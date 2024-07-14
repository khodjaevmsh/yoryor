import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, FlatList, View, Text } from 'react-native'
import normalize from 'react-native-normalize'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { COLOR } from '../utils/colors'
import { baseAxios } from '../hooks/requests'
import { LIKES, COUNT_OF_LIKES } from '../urls'
import { GlobalContext } from '../context/GlobalContext'
import LikeItem from '../components/LikeItem'
import WantMoreLikes from '../components/WantMoreLikes'
import HeaderLeft from '../components/common/HeaderLeft'
import SkeletonLikes from '../components/SkeletonLikes'

export default function Likes() {
    const [loading, setLoading] = useState(false)
    const [likes, setLikes] = useState([])
    const [count, setCount] = useState(0)
    const [totalPages, setTotalPages] = useState(1)
    const [page, setPage] = useState(1)
    const { profile: receiver } = useContext(GlobalContext)
    const navigation = useNavigation()
    const isFocused = useIsFocused()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => <HeaderLeft title="Likes" />,
        })
    }, [navigation])

    useEffect(() => {
        async function fetchLikes() {
            try {
                setLoading(true)
                const response = await baseAxios.get(LIKES, { params: { receiver: receiver.id, page } })
                setLikes(response.data.results)
                setTotalPages(response.data.totalPages)

                const countResponse = await baseAxios.get(COUNT_OF_LIKES, { params: { receiver: receiver.id } })
                setCount(countResponse.data.count)
            } catch (error) {
                console.log(error.response.data)
            } finally {
                setTimeout(() => {
                    setLoading(false)
                }, 500)
            }
        }
        fetchLikes()
    }, [receiver.id, isFocused, page])

    const handleLoadMore = () => {
        if (!loading && page < totalPages) {
            setPage(page + 1)
        }
    }

    if (loading) {
        return <SkeletonLikes />
    }

    return (
        <>
            <View style={styles.likesCount}>
                <Text style={styles.likes}>{count} likes</Text>
            </View>
            <FlatList
                data={likes}
                renderItem={({ item }) => <LikeItem item={item} />}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                onEndReached={handleLoadMore}
                contentContainerStyle={styles.contentContainerStyle}
                onEndReachedThreshold={0.2}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={!loading ? <WantMoreLikes /> : null} />
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
    contentContainerStyle: {
        flexGrow: 1,
        marginHorizontal: 4,
        paddingTop: 16,
    },
    emptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})
