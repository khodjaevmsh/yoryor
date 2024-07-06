import { StyleSheet, View } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import React from 'react'
import normalize from 'react-native-normalize'
import { COLOR } from '../utils/colors'

export default function SkeletonMyProfile() {
    return (
        <>
            <View style={styles.header}>
                <SkeletonPlaceholder backgroundColor={COLOR.extraLightGrey}>
                    <View style={styles.image} />
                    <View style={styles.name} />
                </SkeletonPlaceholder>
            </View>
            <View style={styles.item}>
                <SkeletonPlaceholder backgroundColor={COLOR.extraLightGrey}>
                    <View style={styles.title} />
                    <View style={styles.title2} />
                    <View style={styles.title3} />
                </SkeletonPlaceholder>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        justifyContent: 'center',
    },
    image: {
        width: normalize(110),
        height: normalize(110),
        alignSelf: 'center',
        marginBottom: 20,
    },
    name: {
        width: '70%',
        height: 15,
        alignSelf: 'center',
    },
    item: {
        flex: 2,
        justifyContent: 'center',
        marginHorizontal: 10,
        marginVertical: 15,
        paddingVertical: 30,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: COLOR.extraLightGrey,
    },
    title: {
        width: '40%',
        height: 10,
        marginVertical: 10,
        backgroundColor: 'red',
        alignSelf: 'center',
    },
    title2: {
        width: '60%',
        height: 10,
        marginVertical: 10,
        backgroundColor: 'red',
        alignSelf: 'center',
    },
    title3: {
        width: '40%',
        height: 10,
        marginVertical: 10,
        backgroundColor: 'red',
        alignSelf: 'center',
    },
})
