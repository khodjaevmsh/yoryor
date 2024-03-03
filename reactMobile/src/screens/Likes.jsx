import React, { useContext, useEffect, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import normalize from 'react-native-normalize'
import moment from 'moment'
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native'
import Container from '../components/common/Container'
import { fontSize } from '../utils/fontSizes'
import { COLOR } from '../utils/colors'
import { baseAxios, domain } from '../hooks/requests'
import { LIKES, REGION } from '../urls'
import { GlobalContext } from '../context/GlobalContext'
import NotFound from '../components/NotFound'
import ActiveIndicator from '../components/common/ActivityIndicator'

export default function Likes() {
    const [loading, setLoading] = useState(false)
    const [likes, setLikes] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const { profile } = useContext(GlobalContext)
    const navigation = useNavigation()

    useEffect(() => {
        async function fetchLikes() {
            try {
                setLoading(true)
                const response = await baseAxios.get(LIKES, { params: { receiver: profile.id } })
                setLikes(response.data)
            } catch (error) {
                console.log(error.response.data)
            } finally {
                setLoading(false)
                setRefreshing(false)
            }
        }
        fetchLikes()
    }, [profile.id, refreshing])

    if (loading && !refreshing) {
        return <ActiveIndicator />
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity
            key={item.id}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('ProfileCardDetail', { profile: item.sender })}>
            <FastImage
                style={styles.image}
                source={{
                    uri: item.sender ? `${domain + item.sender.images[0].image}` : null,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover} />
            <View style={styles.cardContent}>
                <Text style={styles.name}>{item.sender.name}, 25</Text>
                <Text style={styles.isLiked}>Sizga like qoydi...</Text>
                <Text style={styles.likedDate}>
                    {moment(item.createdAt).format('DD MMMM, HH:mm')}
                </Text>
            </View>
        </TouchableOpacity>
    )

    return (
        <Container keyboardDismiss={false}>
            <FlatList
                data={likes}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                style={{ flexGrow: 1 }}
                refreshControl={(
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => setRefreshing(true)}
                        tintColor={COLOR.lightGrey} />
                )}
                ListEmptyComponent={<NotFound />} />
        </Container>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        borderBottomWidth: 0.3,
        borderColor: COLOR.lightGrey,
        paddingVertical: 20,
    },
    image: {
        width: normalize(74),
        height: normalize(74),
        borderRadius: 55,
    },
    cardContent: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginLeft: 15,
    },
    name: {
        fontSize: normalize(18),
        fontWeight: '500',
    },
    isLiked: {
        fontSize: fontSize.small,
        color: COLOR.grey,
        marginBottom: 2,
        marginLeft: 2,
    },
    likedDate: {
        fontSize: fontSize.small,
        color: COLOR.black,
    },
})
