import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Text, TouchableOpacity, View } from 'react-native'
import normalize from 'react-native-normalize'
import EncounterCard from '../components/EncounterCard'
import { baseAxios } from '../hooks/requests'
import { PROFILES } from '../urls'
import ActivityIndicator from '../components/common/ActivityIndicator'
import { Tuning2 } from '../components/common/Svgs'
import { COLOR } from '../utils/colors'
import FilterModal from '../components/FilterModal'
import { GlobalContext } from '../context/GlobalContext'
import { getToken } from '../hooks/usePushNotification'

export default function Encounter() {
    const { profile: sender } = useContext(GlobalContext)
    const [loading, setLoading] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false)
    const [receivers, setReceivers] = useState([])
    const [country, setCountry] = useState('')
    const [region, setRegion] = useState('')
    const [gender, setGender] = useState(sender?.gender?.value === 'male' ? 'female' : 'male')
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ marginLeft: 18 }}>
                    <Text style={{ fontSize: normalize(22), fontWeight: '700' }}>
                        Tanishuvlar
                    </Text>
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity style={{ marginRight: 18 }} onPress={() => setModalVisible(true)}>
                    <Tuning2 width={26} height={26} color={COLOR.black} />
                </TouchableOpacity>
            ),
        })
    }, [navigation])

    useEffect(() => {
        async function fetchReceiver() {
            try {
                setLoading(true)
                const response = await baseAxios.get(PROFILES, { params: { encounter: true, country, region, gender } })
                setReceivers(response.data.results)
            } catch (error) {
                console.log(error.response.data)
            } finally {
                setLoading(false)
            }
        }
        fetchReceiver()
    }, [isModalVisible])

    if (loading) {
        return <ActivityIndicator padding />
    }

    return (
        <>
            <EncounterCard receivers={receivers} setModalVisible={setModalVisible} />
            <FilterModal
                isModalVisible={isModalVisible}
                setModalVisible={setModalVisible}
                country={country}
                setCountry={setCountry}
                region={region}
                setRegion={setRegion}
                gender={gender}
                setGender={setGender} />
        </>
    )
}
