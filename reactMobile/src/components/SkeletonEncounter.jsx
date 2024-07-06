import { StyleSheet, View } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import React from 'react'
import { COLOR } from '../utils/colors'

export default function SkeletonEncounter() {
    return (
        <View style={styles.item}>
            <SkeletonPlaceholder backgroundColor={COLOR.extraLightGrey}>
                <View style={styles.title} />
                <View style={styles.title2} />
                <View style={styles.title3} />
            </SkeletonPlaceholder>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        justifyContent: 'flex-end',
        marginHorizontal: 10,
        marginVertical: 15,
        paddingVertical: 30,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: COLOR.extraLightGrey,
    },
    title: {
        width: '70%',
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
