import React, { useContext, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import normalize from 'react-native-normalize'
import Container from '../../components/common/Container'
import { fontSize } from '../../utils/fontSizes'
import { COLOR } from '../../utils/colors'
import { baseAxios } from '../../hooks/requests'
import { PROFILE } from '../../urls'
import Button from '../../components/common/Button'
import { GlobalContext } from '../../context/GlobalContext'
import { showToast } from '../../components/common/Toast'
import { goalsWithIcon } from '../../utils/choices'

export default function Goal({ route }) {
    const { props } = route.params
    const [goal, setGoal] = useState(props.key)
    const [loading, setLoading] = useState(false)
    const { profile, setRender } = useContext(GlobalContext)
    const navigation = useNavigation()

    async function onSubmit() {
        try {
            setLoading(true)
            await baseAxios.put(PROFILE.replace('{id}', profile.id), { goal })
            navigation.goBack()
            if (props.key !== goal) {
                setRender(true)
                showToast('success', 'Woohoo!', 'Maqsadingiz o\'zgartirildi')
            }
        } catch (error) {
            console.log(error.response)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container>
            <Text style={styles.title}>Maqsadingizni beliglang</Text>
            <Text style={styles.subTitle}>Sizning tanishishdan maqsadingiz nima ekanligini beliglang.</Text>
            <View style={styles.goalWrapper}>
                {Object.entries(goalsWithIcon).map(([key, value]) => (
                    <TouchableOpacity
                        key={key}
                        activeOpacity={1}
                        onPress={() => setGoal(key)}
                        style={[styles.goal, goal === key && styles.selected]}>
                        <View>{value.icon}</View>
                        <Text style={styles.goalText}>{value.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.bottomWrapper}>
                <Button title="Davom etish" onPress={onSubmit} buttonStyle={styles.button} loading={loading} />
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: normalize(26),
        fontWeight: '600',
    },
    subTitle: {
        color: COLOR.grey,
        marginTop: 7,
        marginBottom: 8,
        fontSize: fontSize.small,
        lineHeight: 19.5,
    },
    goalWrapper: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 22,
    },
    goal: {
        width: normalize(103),
        height: normalize(135),
        paddingVertical: 14,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: COLOR.extraLightGrey,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 15,
        marginVertical: 6,
    },
    goalText: {
        fontSize: fontSize.small,
        color: COLOR.black,
        textAlign: 'center',
    },
    selected: {
        borderWidth: 2,
        borderColor: COLOR.primary,
    },
    bottomWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
})
