import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import normalize from 'react-native-normalize'
import Container from '../../components/common/Container'
import { fontSize } from '../../utils/fontSizes'
import { COLOR } from '../../utils/colors'
import { baseAxios } from '../../hooks/requests'
import { COUNTRY, PROFILE, REGION } from '../../urls'
import Button from '../../components/common/Button'
import { GlobalContext } from '../../context/GlobalContext'
import PickerSelect from '../../components/common/PickerSelect'
import ServerError from '../../components/common/ServerError'

export default function City({ route }) {
    const { props } = route.params
    const [countryData, setCountryData] = useState([])
    const [country, setCountry] = useState(props.region.country.toString())
    const [regionData, setRegionData] = useState([])
    const [region, setRegion] = useState(props.region.id.toString())
    const [loading, setLoading] = useState(false)
    const [serverError, setServerError] = useState('')
    const [validationError, setValidationError] = useState('')
    const { profile, setRender } = useContext(GlobalContext)
    const navigation = useNavigation()

    async function onSubmit() {
        if (!country || !region) {
            setValidationError('* Majburiy maydon')
        } else {
            try {
                setLoading(true)
                await baseAxios.put(PROFILE.replace('{id}', profile.id), { region })
                navigation.goBack()
                setRender(true)
            } catch (error) {
                setServerError(error.response)
            } finally {
                setLoading(false)
            }
        }
    }

    useEffect(() => {
        async function fetchCountryData() {
            try {
                const response = await baseAxios.get(COUNTRY)
                setCountryData(response.data)
            } catch (error) {
                setValidationError('* Nomalum xatolik, qaytib urinib ko\'ring')
            } finally {
                setLoading(false)
            }
        }
        fetchCountryData()

        async function fetchRegionData() {
            try {
                const response = await baseAxios.get(REGION, { params: { country } })
                setRegionData(response.data)
            } catch (error) {
                setValidationError('* Nomalum xatolik, qaytib urinib ko\'ring')
            } finally {
                setLoading(false)
            }
        }
        fetchRegionData()
    }, [country])

    return (
        <Container>
            <View>
                <Text style={styles.title}>Qayerdan siz?</Text>
            </View>

            <View style={{ flex: 1 }}>
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

                <ServerError error={serverError} style={styles.serverError} />
                {!country || !region ? <Text style={styles.validationError}>{validationError}</Text> : null}

            </View>

            <View style={styles.buttonWrapper}>
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
        fontWeight: '500',
        marginBottom: 18,
    },
    subTitle: {
        color: COLOR.grey,
        marginTop: 7,
        marginBottom: 30,
        lineHeight: 19.5,
        fontSize: fontSize.small,
    },
    gender: {
        width: '100%',
        height: normalize(46),
        backgroundColor: COLOR.extraLightGrey,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginVertical: 6,
    },
    genderText: {
        fontSize: fontSize.medium,
        color: COLOR.black,
        fontWeight: '500',
    },
    activeGender: {
        borderColor: COLOR.primary,
        borderWidth: 1.2,
    },
    validationError: {
        color: COLOR.primary,
        marginLeft: 4,
    },
    buttonWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        width: '100%',
        height: 52,
        fontSize: normalize(16),
        color: 'black',
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 18,
        borderColor: '#F2F2F2',
        flexGrow: 1,
        backgroundColor: COLOR.extraLightGrey,
    },
    inputAndroid: {
        width: '100%',
        height: 52,
        fontSize: normalize(16),
        color: 'black',
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 18,
        borderColor: '#F2F2F2',
        overflow: 'hidden',
        flexGrow: 1,
        marginBottom: normalize(18),
        backgroundColor: COLOR.extraLightGrey,
    },
})
