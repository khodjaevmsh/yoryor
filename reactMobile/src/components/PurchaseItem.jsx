import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLOR } from '../utils/colors'
import { Fire, Star } from './common/Svgs'

const items = [
    { id: 1, label: 'Super Like', icon: <Star color={COLOR.blue} /> },
    { id: 2, label: 'Obunalar', icon: <Fire color={COLOR.primary} /> },
]
export default function PurchaseItem() {
    return (
        <View style={styles.wrapper}>
            {items.map((item) => (
                <TouchableOpacity style={styles.item} key={item.id} activeOpacity={1} onPress={null}>
                    <View style={styles.icon}>{item.icon}</View>
                    <Text style={styles.label}>{item.label}</Text>
                    <Text style={styles.subLabel}>Tez kunda...</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    item: {
        width: '45%',
        height: 110,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderRadius: 10,
        backgroundColor: '#fff',
        // Shadow for iOS
        shadowColor: '#4c4c4c',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // Shadow for Android
        elevation: 5,
    },
    icon: {
        marginBottom: 6,
    },
    label: {
        color: COLOR.grey,
        fontWeight: '500',
        marginBottom: 1,
    },
    subLabel: {
        fontWeight: '400',
    },
})
