import { Image, Text, View, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import normalize from 'react-native-normalize'
import avatar from '../assets/images/profileImg.png'
import { COLOR } from '../utils/colors'
import { fontSize } from '../utils/fontSizes'
import { CheckMarkBlue } from './common/Svgs'
import { GlobalContext } from '../context/GlobalContext'

export default function ProfileHeader() {
    const { profile } = useContext(GlobalContext)

    function determineFontSize(name) {
        if (name) {
            return name.length < 15 ? normalize(26) : normalize(26)
        }
        return normalize(18)
    }

    return (
        <View>
            <View style={styles.nameWrapper}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.name, { fontSize: determineFontSize(profile?.name) }]}>
                        {profile?.name}, 28
                    </Text>
                    <CheckMarkBlue width={22} height={22} />
                </View>
                <Text style={styles.region}>Toshkent</Text>
            </View>

            <View style={styles.imageWrapper}>
                <Image source={avatar} style={styles.image} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    imageWrapper: {
        marginTop: 24,
    },
    image: {
        width: '100%',
        height: normalize(400),
        borderRadius: 28,
    },
    nameWrapper: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 12,
        paddingHorizontal: 10,
    },
    name: {
        fontWeight: '600',
        marginRight: 8,
    },
    region: {
        fontSize: fontSize.small,
        marginTop: 5,
        marginLeft: 1,
        color: COLOR.grey,
    },
})
