import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import normalize from 'react-native-normalize'
import moment from 'moment'
import { shortenText } from '../utils/string'
import { COLOR } from '../utils/colors'

export default function ReceiverName({
    item,
    wrapperStyle,
    nameStyle,
    ageStyle,
    statusStyle,
    maxLength = 15,
    hideAge,
}) {
    const age = new Date().getFullYear() - moment(item?.birthdate).format('YYYY')

    return (
        <View style={[styles.wrapper, { ...wrapperStyle }]}>
            <View style={styles.nameAgeWrapper}>
                <Text style={[styles.name, { ...nameStyle }]}>{shortenText(item?.name, maxLength)}</Text>
                {!hideAge ? <Text style={[styles.name, { ...ageStyle }]}>, {age}</Text> : null}
            </View>
            {item.online === 'online' ? <View style={[styles.status, { ...statusStyle }]} /> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameAgeWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontSize: normalize(Platform.OS === 'ios' ? 12 : 14),
        fontWeight: '500',
    },
    age: {
        fontSize: normalize(Platform.OS === 'ios' ? 12 : 14),
        fontWeight: '500',
    },
    status: {
        width: normalize(9),
        height: normalize(9),
        backgroundColor: COLOR.green,
        borderRadius: 100,
        marginLeft: 7,
    },
})
