import { Platform, StyleSheet, Text, View } from 'react-native'
import RNModal from 'react-native-modal'
import React, { useEffect, useState } from 'react'
import normalize from 'react-native-normalize'
import { COLOR as color, COLOR } from '../utils/colors'
import Container from './common/Container'
import { baseAxios } from '../hooks/requests'
import { COUNTRY, REGION } from '../urls'
import PickerSelect from './common/PickerSelect'
import Button from './common/Button'
import { fontSize } from '../utils/fontSizes'
import GenderFilter from './GenderFilter'
import { showToast } from './common/Toast'

export default function FilterModal({
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
    const [, setServerError] = useState('')

    useEffect(() => {
        async function fetchCountryRegionData() {
            try {
                const countryResponse = await baseAxios.get(COUNTRY)
                setCountryData(countryResponse.data)

                const regionResponse = await baseAxios.get(REGION, { params: { country } })
                setRegionData(regionResponse.data)
            } catch (error) {
                setServerError(error.response.data)
                showToast('error', 'Oops!', 'Nomalum xatolik')
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
                animationInTiming={400}
                animationOutTiming={300}
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

                            <Text style={styles.filterTitle}>Jins bo'yicha</Text>
                            <GenderFilter gender={gender} setGender={setGender} />
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
        paddingTop: Platform.OS === 'ios' ? 42 : null,
        paddingBottom: Platform.OS === 'ios' ? 25 : null,
        marginHorizontal: 10,
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
        fontWeight: '600',
    },
    filterTitle: {
        fontSize: fontSize.medium,
        fontWeight: '500',
        marginTop: 15,
        marginHorizontal: 10,
        marginBottom: 12,
    },
    ageRangeWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 32,
    },
    rangeText: {
        fontSize: fontSize.medium,
        fontWeight: '500',
        marginHorizontal: 10,
    },
})
