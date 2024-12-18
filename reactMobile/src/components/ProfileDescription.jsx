import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { ChevronRight } from 'react-native-feather'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native'
import { COLOR } from '../utils/colors'
import { shortenText } from '../utils/string'

export default function ProfileDescription({ fetchedProfile }) {
    const navigation = useNavigation()

    return (
        <View style={styles.wrapper}>
            <View style={styles.titleWrapper}>
                <View style={styles.dot} />
                <Text style={styles.profileDescription}>Profilingiz tavsifi</Text>
            </View>

            <View style={styles.textArea}>
                <Text style={
                    [styles.placeholder, { color: fetchedProfile && fetchedProfile.bio ? COLOR.black : COLOR.grey }]
                }>
                    {fetchedProfile && fetchedProfile.bio ? shortenText(fetchedProfile.bio, 100) : (
                        "O'zingiz haqingizda ma'lumot qo'shing: sevimli mashg'ulotlar, odatlar..."
                    )}
                </Text>

                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.buttonAdd}
                    onPress={() => navigation.navigate('Bio', { fetchedProfile })}>
                    <View style={styles.iconWithAdd}>
                        <Text style={styles.add}>
                            {fetchedProfile && fetchedProfile.bio ? "O'zgartirish" : "Qo'shish"}
                        </Text>
                        <ChevronRight
                            width={24}
                            height={24}
                            strokeWidth={2.5}
                            color={COLOR.black}
                            style={styles.icon} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    titleWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 18,
    },
    dot: {
        width: 7,
        height: 7,
        borderRadius: 100,
        marginRight: 8,
        backgroundColor: COLOR.primary,
    },
    profileDescription: {
        fontSize: normalize(16),
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    textArea: {
        width: '100%',
        height: normalize(150),
        borderRadius: 15,
        paddingHorizontal: 26,
        paddingVertical: 22,
        backgroundColor: COLOR.extraLightGrey,
    },
    placeholder: {
        fontWeight: '400',
        lineHeight: 22,
        fontSize: normalize(16),
    },
    buttonAdd: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
    },
    iconWithAdd: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    add: {
        fontWeight: '500',
    },
})
