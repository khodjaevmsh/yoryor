import React, { useContext, useEffect, useState } from 'react'
import { Text, View, StyleSheet, FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import { fontSize } from '../utils/fontSizes'
import { COLOR } from '../utils/colors'
import { baseAxios } from '../hooks/requests'
import { LIKES } from '../urls'
import { GlobalContext } from '../context/GlobalContext'
import NotFound from '../components/NotFound'
import LikeItem from '../components/LikeItem'

export default function Likes() {
    const [loading, setLoading] = useState(false)
    const [likes, setLikes] = useState([])
    const [likesCount, setLikesCount] = useState(0)
    const [refreshing, setRefreshing] = useState(false)
    const [page, setPage] = useState(1)
    const [numPages, setNumPages] = useState(1)
    const { profile } = useContext(GlobalContext)

    useEffect(() => {
        async function fetchLikes() {
            try {
                setLoading(true)
                const response = await baseAxios.get(LIKES, { params: { page, receiver: profile.id } })

                setNumPages(response.data.numPages)
                setLikes((prevData) => [...prevData, ...response.data.results])
                setLikesCount(response.data.results[0].likesCount)
            } catch (error) {
                console.log(error.response.data)
            } finally {
                setLoading(false)
                setRefreshing(false)
            }
        }
        if (page <= numPages) {
            fetchLikes()
        }
    }, [profile.id, refreshing, setLoading, setRefreshing, page, numPages])

    return (
        <>
            <View style={styles.tabs}>
                <View style={styles.tabItem}>
                    <Text style={styles.tabTitle}>{likesCount} Likes</Text>
                </View>
            </View>
            <FlatList
                data={likes}
                renderItem={({ item }) => <LikeItem item={item} />}
                numColumns={2}
                columnWrapperStyle={{ marginTop: 12, marginHorizontal: 6 }}
                keyExtractor={(item) => item.id}
                onEndReached={() => setPage((prevPage) => prevPage + 1)}
                onEndReachedThreshold={0.8}
                ListFooterComponent={() => (loading && !refreshing ? <ActivityIndicator size="large" /> : null)}
                refreshControl={(
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => {
                            setRefreshing(true)
                            setLikes([])
                            setPage(1)
                        }}
                        tintColor={COLOR.lightGrey} />
                )}
                ListEmptyComponent={!loading && !refreshing ? (
                    <NotFound wrapperStyle={{ marginHorizontal: 18 }} />
                ) : null}
            />
        </>
    )
}

const styles = StyleSheet.create({
    tabs: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderColor: COLOR.lightGrey,
        paddingVertical: 10,
    },
    tabItem: {
        flex: 1,
        borderRightWidth: 1,
        borderColor: COLOR.lightGrey,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
    },
    tabTitle: {
        fontSize: fontSize.medium,
        fontWeight: '600',
    },
})
