import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { View, StyleSheet, FlatList, TouchableOpacity, RefreshControl, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import normalize from 'react-native-normalize'
import { baseAxios } from '../hooks/requests'
import { PROFILES } from '../urls'
import { Tuning2 } from '../components/common/Svgs'
import { COLOR } from '../utils/colors'
import FilterModal from '../components/FilterModal'
import DiscoverItem from '../components/DiscoverItem'
import { GlobalContext } from '../context/GlobalContext'
import ActivityIndicator from '../components/common/ActivityIndicator'

export default function Discover() {
    const { profile: sender } = useContext(GlobalContext)
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [receivers, setReceivers] = useState([])
    const [country, setCountry] = useState('')
    const [region, setRegion] = useState('')
    const [gender, setGender] = useState(sender?.gender?.value === 'male' ? 'female' : 'male')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [isModalVisible, setModalVisible] = useState(false)
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ marginLeft: 18 }}>
                    <Text style={{ fontSize: normalize(22), fontWeight: '700', color: COLOR.primary }}>Sovchi</Text>
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity style={{ marginRight: 18 }} onPress={() => setModalVisible(true)}>
                    <Tuning2 width={26} height={26} color={COLOR.black} />
                </TouchableOpacity>
            ),
        })
    }, [navigation])

    useEffect(() => {
        async function fetchReceivers() {
            try {
                setLoading(true)
                const response = await baseAxios.get(PROFILES, { params: { page, country, region, gender } })
                if (!refreshing) {
                    setReceivers((prevData) => [...prevData, ...response.data.results])
                } else {
                    setReceivers([])
                }
                setTotalPages(response.data.totalPages)
            } catch (error) {
                console.log(error.response.data)
            } finally {
                setLoading(false)
                setRefreshing(false)
            }
        }
        fetchReceivers()
    }, [refreshing, page, isModalVisible])

    useEffect(() => {
        // Function to be executed when isModalVisible changes to false
        if (!isModalVisible) {
            // Reset the fetchedProfiles, page, or any other state you want to refresh
            setReceivers([])
            setPage(1)
        }
    }, [isModalVisible])

    function handleRefresh() {
        setRefreshing(true)
        setPage(1)
    }

    function handleLoadMore() {
        if (!loading && !refreshing && page < totalPages) {
            setPage(page + 1) // Load next page
        }
    }

    const renderItem = ({ item }) => <DiscoverItem item={item} />

    return (
        <View style={styles.container}>
            <FlatList
                data={receivers}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
                contentContainerStyle={styles.contentContainerStyle}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.2}
                ListFooterComponent={() => (loading && !refreshing ? <ActivityIndicator padding /> : null)}
                refreshControl={(
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={COLOR.lightGrey} />
                )} />

            <FilterModal
                isModalVisible={isModalVisible}
                setModalVisible={setModalVisible}
                country={country}
                setCountry={setCountry}
                region={region}
                setRegion={setRegion}
                gender={gender}
                setGender={setGender} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 5,
    },
    contentContainerStyle: {
        paddingTop: 10,
    },
})
