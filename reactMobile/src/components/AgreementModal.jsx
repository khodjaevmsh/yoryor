import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { X } from 'react-native-feather'
import React, { useContext, useState } from 'react'
import normalize from 'react-native-normalize'
import { useFormikContext } from 'formik'
import { useNavigation } from '@react-navigation/native'
import { COLOR } from '../utils/colors'
import Button from './common/Button'
import Modal from './Modal'
import { fontSize } from '../utils/fontSizes'
import { baseAxios } from '../hooks/requests'
import { SIGN_UP } from '../urls'
import { GlobalContext } from '../context/GlobalContext'

export default function AgreementModal({ isModalVisible, setModalVisible, phoneNumber, setServerError }) {
    const [loading, setLoading] = useState(false)
    const { auth } = useContext(GlobalContext)
    const navigation = useNavigation()
    const { values } = useFormikContext()
    //
    // async function onSubmit() {
    //     try {
    //         setLoading(true)
    //         const response = await baseAxios.post(SIGN_UP, { phoneNumber, password: values.password2 })
    //
    //         setModalVisible(false)
    //         await auth(response.data.token, response.data.user)
    //         navigation.reset({ index: 0, routes: [{ name: 'SetPassword' }] })
    //         navigation.navigate('SetName')
    //         setLoading(false)
    //     } catch (error) {
    //         setServerError(error.response)
    //     }
    // }

    async function onSubmit() {
        if (values.password2) {
            setModalVisible(false)

            navigation.navigate('SetName', { phoneNumber, password: values.password2 })
            setLoading(false)
        }
    }

    return (
        <Modal styleChildren={styles.styleChildren}
            isModalVisible={isModalVisible}
            animationIn="slideInUp"
            coverScreen
            hasBackdrop
            backdropColor="white"
            backdropOpacity={1}
            animationOut="slideOutDown">
            <View style={{ flex: 2 }}>
                <TouchableOpacity activeOpacity={0.7}>
                    <X width={34} height={34} color={COLOR.grey} />
                </TouchableOpacity>
                <View>
                    <Text style={styles.welcome}>Welcome to sovcHi.</Text>
                    <Text style={styles.please}>Iltimos ushbu qoidalarga rioya qiling.</Text>
                </View>
            </View>

            <View style={{ flex: 5 }}>
                <View style={styles.rules}>
                    <Text style={styles.modalTitle}>Be yourself.</Text>
                    <Text style={styles.modalSubTitle}>
                        Rasmlaringiz, yoshingiz hamda qolgan ma'lumotlaringiz to'g'ri ekanligiga
                        ishonch hosil qiling.
                    </Text>
                </View>

                <View style={styles.rules}>
                    <Text style={styles.modalTitle}>Play cool.</Text>
                    <Text style={styles.modalSubTitle}>
                        Ishtirokchilarni hurmat qiling, barchasi hurmatdan boshlanadi.
                    </Text>
                </View>

                <View style={styles.rules}>
                    <Text style={styles.modalTitle}>Be proactive.</Text>
                    <Text style={styles.modalSubTitle}>
                        Shubxali xatti-harakatlar to'g'risida Bizga xabar bering.
                    </Text>
                </View>

            </View>

            <View style={styles.buttonWrapper}>
                <Button title="Roziman" loading={loading} onPress={onSubmit} />
            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    styleChildren: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 42,
        paddingBottom: 25,
    },
    welcome: {
        fontSize: normalize(32),
        fontWeight: '600',
        marginTop: 22,
    },
    please: {
        fontSize: fontSize.medium,
        color: COLOR.grey,
        marginTop: 7,
    },
    rules: {
        marginBottom: 28,
    },
    modalTitle: {
        fontSize: fontSize.large,
        fontWeight: '500',
    },
    modalSubTitle: {
        fontSize: fontSize.medium,
        color: COLOR.grey,
        marginTop: 5,
        lineHeight: 21,
    },
    buttonWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
})
