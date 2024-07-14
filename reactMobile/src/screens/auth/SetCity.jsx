import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native'
import Container from '../../components/common/Container'
import Button from '../../components/common/Button'
import { fontSize } from '../../utils/fontSizes'
import { COLOR } from '../../utils/colors'
import PickerSelect from '../../components/common/PickerSelect'
import { baseAxios } from '../../hooks/requests'
import { COUNTRY, REGION } from '../../urls'
import { showToast } from '../../components/common/Toast'
import ValidationError from '../../components/common/ValidationError'

export default function SetCity({ route }) {
    const [loading, setLoading] = useState(false)
    const [countryData, setCountryData] = useState([])
    const [country, setCountry] = useState('')
    const [regionData, setRegionData] = useState([])
    const [region, setRegion] = useState('')
    const [validationError, setValidationError] = useState('')
    const { phoneNumber, password, name, birthdate, gender } = route.params
    const navigation = useNavigation()

    function onSubmit() {
        setLoading(true)
        setValidationError('')
        if (!country || !region) {
            setValidationError("Barcha maydonlar to'ldirilishi shart")
        } else {
            navigation.navigate('SetEducation', { phoneNumber, password, name, birthdate, gender, region })
        }
        setLoading(false)
    }

    useEffect(() => {
        async function fetchCountryData() {
            try {
                const response = await baseAxios.get(COUNTRY)
                setCountryData(response.data)
            } catch (error) {
                showToast('error', 'Oops!', error.response.data)
            }
        }
        fetchCountryData()

        async function fetchRegionData() {
            try {
                const response = await baseAxios.get(REGION, { params: { country } })
                setRegionData(response.data)
            } catch (error) {
                showToast('error', 'Oops!', error.response.data)
            }
        }
        fetchRegionData()
    }, [region, country])

    return (
        <Container>
            <Text style={styles.title}>Qayerdan siz?</Text>
            <Text style={styles.subTitle}>Qaysi shahardan ekanligizni tanlang.</Text>

            <PickerSelect
                placeholder={{ label: 'Davlatni tanlang', value: '' }}
                items={countryData && Array.isArray(countryData) ? (
                    countryData.map((item) => ({ label: item.title, value: `${item.id}` }))
                ) : []}
                value={country}
                onValueChange={(value) => setCountry(value)} />

            <PickerSelect
                placeholder={{ label: 'Shaharni tanlang', value: '' }}
                items={regionData && Array.isArray(regionData) ? (
                    regionData.map((item) => ({ label: item.title, value: `${item.id}` }))
                ) : []}
                value={region}
                style={pickerSelectStyles}
                onValueChange={(value) => setRegion(value)} />

            <ValidationError validationError={validationError} wrapperStyle={styles.validationError} />

            <View style={styles.bottomWrapper}>
                <Button
                    title="Davom etish"
                    onPress={onSubmit}
                    buttonStyle={styles.button}
                    loading={loading} />
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
    validationError: {
        marginTop: 15,
    },
    bottomWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        width: '100%',
        height: normalize(48),
        fontSize: normalize(16),
        color: 'black',
        borderWidth: 1,
        borderRadius: 55,
        paddingHorizontal: 20,
        paddingVertical: 18,
        borderColor: '#F2F2F2',
        flexGrow: 1,
        backgroundColor: COLOR.extraLightGrey,
    },
    inputAndroid: {
        width: '100%',
        height: normalize(48),
        fontSize: normalize(16),
        color: 'black',
        borderWidth: 1,
        borderRadius: 55,
        paddingHorizontal: 20,
        paddingVertical: 18,
        borderColor: '#F2F2F2',
        overflow: 'hidden',
        flexGrow: 1,
        marginBottom: normalize(18),
        backgroundColor: COLOR.extraLightGrey,
    },
})
