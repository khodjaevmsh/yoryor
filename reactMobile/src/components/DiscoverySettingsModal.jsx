import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import RNModal from 'react-native-modal'
import React, { useEffect, useState } from 'react'
import normalize from 'react-native-normalize'
import { COLOR as color, COLOR } from '../utils/colors'
import Container from './common/Container'
import { baseAxios } from '../hooks/requests'
import { COUNTRY, REGION } from '../urls'
import PickerSelect from './common/PickerSelect'
import ServerError from './common/ServerError'

export default function DiscoverySettingsModal({ isModalVisible, setModalVisible }) {
    const [countryData, setCountryData] = useState([])
    const [country, setCountry] = useState('')
    const [regionData, setRegionData] = useState([])
    const [region, setRegion] = useState('')
    const [loading, setLoading] = useState(false)
    const [serverError, setServerError] = useState('')

    useEffect(() => {
        async function fetchCountryData() {
            try {
                const response = await baseAxios.get(COUNTRY)
                setCountryData(response.data)
            } catch (error) {
                setServerError(error.response.data)
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
                setServerError(error.response.data)
            } finally {
                setLoading(false)
            }
        }
        fetchRegionData()
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
                        <Text style={[styles.title, { color: color.white, fontSize: normalize(15) }]}>
                            Qo'llash
                        </Text>
                        <Text style={styles.title}>Filter</Text>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => setModalVisible(false)}>
                            <Text style={[styles.title, { color: color.primary, fontSize: normalize(15) }]}>
                                Qo'llash
                            </Text>
                        </TouchableOpacity>
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

                            <ServerError error={serverError} style={styles.serverError} />

                        </View>

                    </Container>
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
    header: {
        height: normalize(46),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingBottom: 10,
        borderBottomWidth: 0.3,
        borderColor: color.lightGrey,
    },
    title: {
        fontSize: normalize(18),
        fontWeight: '500',
    },
})
