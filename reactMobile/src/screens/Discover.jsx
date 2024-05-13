import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, RefreshControl } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { baseAxios } from '../hooks/requests'
import { PROFILES } from '../urls'
import RenderProfileCard from '../components/RenderProfileCard'
import { Tuning2 } from '../components/common/Svgs'
import { COLOR } from '../utils/colors'
import DiscoverySettingsModal from '../components/DiscoverySettingsModal'

export default function Discover() {
    const [loading, setLoading] = useState(false)
    const [serverError, setServerError] = useState(null)
    const [fetchedProfiles, setFetchedProfile] = useState([])
    const [page, setPage] = useState(1)
    const [numPages, setNumPages] = useState(1)
    const [isModalVisible, setModalVisible] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => setModalVisible(true)} style={{ paddingRight: 6 }}>
                    <Tuning2 width={28} height={28} color={COLOR.black} />
                </TouchableOpacity>
            ),
        })
    }, [navigation])

    useEffect(() => {
        async function fetchProfile() {
            try {
                setLoading(true)
                const response = await baseAxios.get(PROFILES, { params: { page } })
                setNumPages(response.data.numPages)
                setFetchedProfile((prevData) => [...prevData, ...response.data.results])
            } catch (error) {
                setServerError(error.response)
            } finally {
                setLoading(false)
                setRefreshing(false)
            }
        }

        if (page <= numPages) {
            fetchProfile()
        }
    }, [numPages, page])

    return (
        <View style={styles.container}>
            <FlatList
                data={fetchedProfiles}
                renderItem={({ item }) => <RenderProfileCard item={item} />}
                numColumns={2}
                contentContainerStyle={{ paddingTop: 12 }}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                onEndReached={() => setPage((prevPage) => prevPage + 1)}
                onEndReachedThreshold={0.8}
                ListFooterComponent={() => (loading && !refreshing ? <ActivityIndicator size="large" /> : null)}
                refreshControl={(
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => {
                            setRefreshing(true)
                            setFetchedProfile([])
                            setPage(1)
                        }}
                        tintColor={COLOR.lightGrey} />
                )} />
            <DiscoverySettingsModal
                isModalVisible={isModalVisible}
                setModalVisible={setModalVisible} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 6,
    },
})
