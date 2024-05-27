import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import normalize from 'react-native-normalize'
import { COLOR } from '../utils/colors'

export default function GenderFilter({ gender, setGender }) {
    return (
        <View style={styles.genderWrapper}>
            <TouchableOpacity
                style={[styles.gender, { backgroundColor: gender === 'male' ? COLOR.lightPrimary : null }]}
                onPress={() => setGender('male')}>
                <Text style={styles.genderValue}>Erkak</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.gender, { backgroundColor: gender === 'female' ? COLOR.lightPrimary : null }]}
                onPress={() => setGender('female')}>
                <Text style={styles.genderValue}>Ayol</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    genderWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    gender: {
        width: '47%',
        height: normalize(48),
        borderRadius: 100,
        borderWidth: 1,
        borderColor: COLOR.extraLightGrey,
        justifyContent: 'center',
        alignItems: 'center',
    },
    genderValue: {
        fontWeight: '500',
    },
})
