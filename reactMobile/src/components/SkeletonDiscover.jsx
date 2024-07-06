import { FlatList, StyleSheet, View } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import React from 'react'
import normalize from 'react-native-normalize'
import { COLOR } from '../utils/colors'

export default function SkeletonDiscover() {
    const renderItem = () => (
        <View style={styles.card}>
            <SkeletonPlaceholder backgroundColor={COLOR.extraLightGrey}>
                <View style={styles.cardImage} />
                <View style={styles.title} />
                <View style={styles.subTitle} />
            </SkeletonPlaceholder>
        </View>
    )
    return (
        <FlatList
            data={Array(12).fill().map((_, index) => ({ id: index + 1 }))}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            contentContainerStyle={styles.contentContainerStyle} />
    )
}

const styles = StyleSheet.create({
    contentContainerStyle: {
        flex: 1,
        paddingTop: 15,
    },
    card: {
        flex: 1,
        marginHorizontal: 8,
        marginBottom: 30,
    },
    cardImage: {
        height: normalize(140),
    },
    title: {
        width: '85%',
        height: 10,
        marginVertical: 10,
    },
    subTitle: {
        width: '65%',
        height: 8,
    },
})
