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
import { showToast } from '../../components/common/Toast'

export default function City({ route }) {
    const { props } = route.params
    const [countryData, setCountryData] = useState([])
    const [country, setCountry] = useState(props.region.country.toString())
    const [regionData, setRegionData] = useState([])
    const [region, setRegion] = useState(props.region.id.toString())
    const [loading, setLoading] = useState(false)
    const { profile, updateProfileStorage } = useContext(GlobalContext)
    const navigation = useNavigation()

    async function onSubmit() {
        try {
            setLoading(true)
            const response = await baseAxios.put(PROFILE.replace('{id}', profile.id), { region })
            await updateProfileStorage(response.data)
            navigation.goBack()
            if (props.region.country.toString() !== country || props.region.id.toString() !== region) {
                showToast('success', 'Woohoo!', 'Yashash joyingiz o\'zgartirildi')
            }
        } catch (error) {
            console.log(error.response)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        async function fetchCountryData() {
            try {
                const response = await baseAxios.get(COUNTRY)
                setCountryData(response.data)
            } catch (error) {
                console.log(error.response)
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
                console.log(error.response)
            } finally {
                setLoading(false)
            }
        }
        fetchRegionData()
    }, [country])

    return (
        <Container>
            <Text style={styles.title}>Qayerdan siz?</Text>
            <Text style={styles.subTitle}>
                Hozrigi kunda qayerda istiqomat qilishingiz to'g'risida kiriting.
                Foydalanuvchilar sizni istiqomat qilish manzilingiz orqali topishadi.
            </Text>
            <View style={styles.pickerWrapper}>
                <PickerSelect
                    // placeholder={{ label: 'Davlatni tanlang', value: '' }}
                    items={countryData && Array.isArray(countryData) ? (
                        countryData.map((item) => ({ label: item.title, value: `${item.id}` }))
                    ) : []}
                    value={country}
                    onValueChange={(value) => setCountry(value)} />
                <PickerSelect
                    // placeholder={{ label: 'Shaharni tanlang', value: '' }}
                    items={regionData && Array.isArray(regionData) ? (
                        regionData.map((item) => ({ label: item.title, value: `${item.id}` }))
                    ) : []}
                    value={region}
                    onValueChange={(value) => setRegion(value)} />
            </View>
            <View style={styles.buttonWrapper}>
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
    pickerWrapper: {
        flex: 1,
        marginTop: 22,
    },
    buttonWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
})
