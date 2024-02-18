import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { X } from 'react-native-feather'
import React, { useState } from 'react'
import normalize from 'react-native-normalize'
import { useFormikContext } from 'formik'
import { useNavigation } from '@react-navigation/native'
import RNModal from 'react-native-modal'
import { COLOR } from '../utils/colors'
import Button from './common/Button'
import { fontSize } from '../utils/fontSizes'
import ConfirmModal from './ConfirmModal'

export default function AgreementModal({ isModalVisible, setModalVisible, phoneNumber }) {
    const [loading, setLoading] = useState(false)
    const [isModalConfirm, setModalConfirm] = useState(false)

    const navigation = useNavigation()
    const { values } = useFormikContext()

    async function onSubmit() {
        if (values.password2) {
            navigation.navigate('SetName', { phoneNumber, password: values.password2 })
            setLoading(false)
            setModalVisible(false)
        }
    }

    return (
        <View>
            <RNModal
                isVisible={isModalVisible}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                // animationInTiming={350}
                // animationOutTiming={400}
                backdropTransitionOutTiming={0}
                coverScreen
                hasBackdrop
                backdropColor={COLOR.white}
                style={styles.modal}
                backdropOpacity={1}>

                <View style={{ flex: 1 }}>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => setModalConfirm(true)}>
                        <ConfirmModal
                            title="Bekor qilmoqchimisiz?"
                            subTitle="Diqqat, siz kiritgan ma'lumotlarning barchasi bekor bo'ladi!"
                            cancelTitle="Bekor qilish"
                            isModalConfirm={isModalConfirm}
                            setModalConfirm={setModalConfirm}
                            cancel={() => navigation.navigate('Splash')} />
                        <X width={34} height={34} color={COLOR.grey} />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.welcome}>Welcome to sovcHi.</Text>
                        <Text style={styles.please}>Iltimos ushbu qoidalarga rioya qiling.</Text>
                    </View>
                </View>

                <View style={{ flex: 2 }}>
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

            </RNModal>
        </View>
    )
}

const styles = StyleSheet.create({
    modal: {
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
