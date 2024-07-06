import { FlatList, StyleSheet, View } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import React from 'react'
import normalize from 'react-native-normalize'
import { COLOR } from '../utils/colors'

export default function SkeletonLikes() {
    const renderItem = () => (
        <View style={styles.item}>
            <SkeletonPlaceholder backgroundColor={COLOR.extraLightGrey}>
                <View style={styles.itemImage} />
                <View style={styles.title} />
                <View style={styles.subTitle} />
            </SkeletonPlaceholder>
        </View>
    )
    return (
        <FlatList
            data={Array(6).fill().map((_, index) => ({ id: index + 1 }))}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.contentContainerStyle} />
    )
}

const styles = StyleSheet.create({
    contentContainerStyle: {
        flex: 1,
        paddingTop: 15,
        marginHorizontal: 10,
    },
    item: {
        flex: 1,
        marginHorizontal: 5,
        marginBottom: 20,
    },
    itemImage: {
        height: normalize(220),
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
