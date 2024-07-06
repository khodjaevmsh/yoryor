import { FlatList, StyleSheet, View } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import React from 'react'
import normalize from 'react-native-normalize'
import { COLOR } from '../utils/colors'

export default function SkeletonChat() {
    const renderItem = () => (
        <SkeletonPlaceholder backgroundColor={COLOR.extraLightGrey}>
            <View style={styles.container}>
                <View style={styles.itemImage} />
                <View style={styles.textContainer}>
                    <View style={styles.title} />
                    <View style={styles.subTitle} />
                </View>
            </View>
        </SkeletonPlaceholder>
    )
    return (
        <FlatList
            data={Array(10).fill().map((_, index) => ({ id: index + 1 }))}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.contentContainerStyle} />
    )
}

const styles = StyleSheet.create({
    contentContainerStyle: {
        flex: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
    },
    itemImage: {
        width: normalize(58),
        height: normalize(58),
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        width: '70%',
        height: 10,
        backgroundColor: '#e0e0e0',
        marginBottom: 8,
    },
    subTitle: {
        width: '95%',
        height: 10,
        backgroundColor: '#e0e0e0', // Skeleton color
    },
})
