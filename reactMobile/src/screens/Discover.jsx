import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, FlatList, RefreshControl } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { baseAxios } from '../hooks/requests'
import { PROFILES } from '../urls'
import { Tuning2 } from '../components/common/Svgs'
import { COLOR } from '../utils/colors'
import FilterModal from '../components/FilterModal'
import DiscoverItem from '../components/DiscoverItem'
import { GlobalContext } from '../context/GlobalContext'
import ActivityIndicator from '../components/common/ActivityIndicator'
import HeaderLeft from '../components/common/HeaderLeft'
import HeaderRight from '../components/common/HeaderRight'
import { showToast } from '../components/common/Toast'
import WantMoreLikes from '../components/WantMoreLikes'
import SkeletonDiscover from '../components/SkeletonDiscover'

export default function Discover() {
    const { profile: sender } = useContext(GlobalContext)
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [receivers, setReceivers] = useState([])
    const [country, setCountry] = useState('')
    const [region, setRegion] = useState('')
    const [gender, setGender] = useState(sender?.gender?.value === 'male' ? 'female' : 'male')
    const [isModalVisible, setModalVisible] = useState(false)
    const [applyFilter, setApplyFilter] = useState(false)
    const [onLoadMore, setOnLoadMore] = useState(false)
    const [totalPages, setTotalPages] = useState(1)
    const [page, setPage] = useState(1)
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => <HeaderLeft title="Sovchi" titleColor={COLOR.primary} />,
            headerRight: () => (
                <HeaderRight
                    onPress={() => setModalVisible(true)}
                    icon={<Tuning2 width={26} height={26} color={COLOR.black} />} />
            ),
        })
    }, [navigation])

    async function fetchReceivers() {
        try {
            setLoading(true)
            const response = await baseAxios.get(PROFILES, { params: { page, country, region, gender } })
            if (onLoadMore) {
                setReceivers((prevData) => [...prevData, ...response.data.results])
                setOnLoadMore(false)
            } else {
                setReceivers(response.data.results)
            }
            setTotalPages(response.data.totalPages)
        } catch (error) {
            console.log(error.response.data)
        } finally {
            setApplyFilter(false)
            setTimeout(() => {
                setRefreshing(false)
                setLoading(false)
            }, 500)
        }
    }

    useEffect(() => {
        fetchReceivers()
    }, [page, applyFilter])

    function handleLoadMore() {
        if (!loading && !refreshing && page < totalPages) {
            setOnLoadMore(true)
            setPage(page + 1)
        }
    }

    function handleRefresh() {
        setRefreshing(true)
        setReceivers([])
        setPage(1)
        fetchReceivers()
    }

    if (loading) {
        return <SkeletonDiscover />
    }

    return (
        <>
            <FlatList
                data={receivers}
                renderItem={({ item }) => <DiscoverItem item={item} />}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
                contentContainerStyle={styles.contentContainerStyle}
                onEndReached={handleLoadMore}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.2}
                ListFooterComponent={() => (onLoadMore && !refreshing ? <ActivityIndicator padding /> : null)}
                refreshControl={(
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={COLOR.lightGrey} />
                )}
                ListEmptyComponent={!loading && !refreshing ? <WantMoreLikes /> : null} />

            <FilterModal
                isModalVisible={isModalVisible}
                setModalVisible={setModalVisible}
                applyFilter={applyFilter}
                setApplyFilter={setApplyFilter}
                country={country}
                setCountry={setCountry}
                region={region}
                setRegion={setRegion}
                gender={gender}
                setGender={setGender}
                setPage={setPage} />
        </>
    )
}

const styles = StyleSheet.create({
    contentContainerStyle: {
        flexGrow: 1,
        paddingTop: 10,
    },
})
