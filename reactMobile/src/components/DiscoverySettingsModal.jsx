import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import RNModal from 'react-native-modal'
import React, { useEffect, useState } from 'react'
import normalize from 'react-native-normalize'
import { COLOR as color, COLOR } from '../utils/colors'
import Container from './common/Container'
import { baseAxios } from '../hooks/requests'
import { COUNTRY, REGION } from '../urls'
import PickerSelect from './common/PickerSelect'
import ServerError from './common/ServerError'
import Button from './common/Button'
import { fontSize } from '../utils/fontSizes'

export default function DiscoverySettingsModal({
    isModalVisible,
    setModalVisible,
    country,
    setCountry,
    region,
    setRegion,
    gender,
    setGender,
}) {
    const [countryData, setCountryData] = useState([])
    const [regionData, setRegionData] = useState([])
    const [serverError, setServerError] = useState('')

    useEffect(() => {
        async function fetchCountryRegionData() {
            try {
                const countryResponse = await baseAxios.get(COUNTRY)
                setCountryData(countryResponse.data)

                const regionResponse = await baseAxios.get(REGION, { params: { country } })
                setRegionData(regionResponse.data)
            } catch (error) {
                setServerError(error.response.data)
            }
        }
        fetchCountryRegionData()
    }, [country])

    return (
        <View>
            <RNModal
                isVisible={isModalVisible}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                backdropTransitionOutTiming={0}
                coverScreen
                hasBackdrop
                backdropColor={COLOR.white}
                style={styles.modal}
                backdropOpacity={1}>

                <View style={{ flex: 1 }}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Filter</Text>
                    </View>

                    <Container scrollable containerStyle={{ paddingHorizontal: 6 }}>
                        <View style={{ flex: 1 }}>
                            <PickerSelect
                                label="Davlat bo'yicha"
                                placeholder={{ label: 'Davlatni tanlang', value: '' }}
                                items={countryData && Array.isArray(countryData) ? (
                                    countryData.map((item) => ({ label: item.title, value: `${item.id}` }))
                                ) : []}
                                value={country}
                                onValueChange={(value) => setCountry(value)} />

                            <PickerSelect
                                label="Shahar bo'yicha"
                                labelStyle={{ marginTop: 6 }}
                                placeholder={{ label: 'Shaharni tanlang', value: '' }}
                                items={regionData && Array.isArray(regionData) ? (
                                    regionData.map((item) => ({ label: item.title, value: `${item.id}` }))
                                ) : []}
                                value={region}
                                onValueChange={(value) => setRegion(value)} />

                            <Text style={styles.genderTitle}>Jins bo'yicha</Text>
                            <View style={styles.genderWrapper}>

                                <TouchableOpacity
                                    style={[styles.gender, { backgroundColor: gender ? COLOR.lightPrimary : null }]}
                                    onPress={() => setGender(true)}>
                                    <Text style={styles.genderValue}>Erkak</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.gender, { backgroundColor: !gender ? COLOR.lightPrimary : null }]}
                                    onPress={() => setGender(false)}>
                                    <Text style={styles.genderValue}>Ayol</Text>
                                </TouchableOpacity>
                            </View>

                            <ServerError error={serverError} style={styles.serverError} />

                        </View>
                    </Container>
                </View>

                <Button title="Qo'llash" onPress={() => setModalVisible(false)} />
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
    header: {
        height: normalize(46),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingBottom: 10,
        borderBottomWidth: 0.3,
        borderColor: color.lightGrey,
    },
    title: {
        fontSize: normalize(18),
        fontWeight: '500',
    },

    genderTitle: {
        fontSize: fontSize.medium,
        fontWeight: '500',
        marginTop: 15,
        marginHorizontal: 10,
        marginBottom: 12,
    },
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
