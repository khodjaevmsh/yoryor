import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import RNModal from 'react-native-modal'
import React, { useEffect, useState } from 'react'
import normalize from 'react-native-normalize'
import { X } from 'react-native-feather'
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
    setApplyFilter,
    country,
    setCountry,
    region,
    setRegion,
    gender,
    setGender,
    setPage = () => {},
}) {
    const [countryData, setCountryData] = useState([])
    const [regionData, setRegionData] = useState([])

    useEffect(() => {
        async function fetchCountryRegionData() {
            try {
                const countryResponse = await baseAxios.get(COUNTRY)
                setCountryData(countryResponse.data)

                const regionResponse = await baseAxios.get(REGION, { params: { country } })
                setRegionData(regionResponse.data)
            } catch (error) {
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

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <X width={30} height={30} color={COLOR.black} strokeWidth={2.2} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Filter</Text>
                    <X width={30} height={30} color="transparent" />
                </View>

                <Container scrollable containerStyle={styles.containerStyle}>
                    <View style={styles.pickerSelect}>
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

                <Button title="Qo'llash" onPress={() => {
                    setPage(setPage)
                    setApplyFilter(true)
                    setModalVisible(false)
                }} />
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
        justifyContent: 'space-between',
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
    containerStyle: {
        paddingHorizontal: 6,
    },
    pickerSelect: {
        flex: 1,
    },
})
