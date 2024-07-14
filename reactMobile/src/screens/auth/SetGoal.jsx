import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import normalize from 'react-native-normalize'
import Container from '../../components/common/Container'
import Button from '../../components/common/Button'
import { fontSize } from '../../utils/fontSizes'
import { COLOR } from '../../utils/colors'
import ValidationError from '../../components/common/ValidationError'
import { goalsWithIcon } from '../../utils/choices'

export default function SetGoal({ route }) {
    const [loading, setLoading] = useState(false)
    const [validationError, setValidationError] = useState('')
    const [goal, setGoal] = useState(null)
    const navigation = useNavigation()
    const { phoneNumber, password, name, birthdate, gender, region, education, job } = route.params

    function onSubmit() {
        setLoading(true)
        if (goal) {
            setValidationError('')
            navigation.navigate('SetProfileImage', {
                phoneNumber,
                password,
                name,
                birthdate,
                gender,
                region,
                education,
                job,
                goal,
            })
        } else {
            setValidationError('Maqsadingizni tanlang')
        }
        setLoading(false)
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
            <ValidationError validationError={validationError} wrapperStyle={styles.validationError} />
            <View style={styles.bottomWrapper}>
                <Button title="Davom etish" onPress={onSubmit} buttonStyle={styles.button} loading={loading} />
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: normalize(28),
        fontWeight: '600',
    },
    subTitle: {
        color: COLOR.grey,
        marginTop: 7,
        marginBottom: 20,
        fontSize: fontSize.small,
        lineHeight: 19.5,
    },
    goalWrapper: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 54,
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
