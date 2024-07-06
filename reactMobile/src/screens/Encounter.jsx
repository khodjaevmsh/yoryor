import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import EncounterCard from '../components/EncounterCard'
import { baseAxios } from '../hooks/requests'
import { PROFILES } from '../urls'
import { Tuning2 } from '../components/common/Svgs'
import { COLOR } from '../utils/colors'
import FilterModal from '../components/FilterModal'
import { GlobalContext } from '../context/GlobalContext'
import HeaderLeft from '../components/common/HeaderLeft'
import HeaderRight from '../components/common/HeaderRight'
import { showToast } from '../components/common/Toast'
import SkeletonEncounter from '../components/SkeletonEncounter'

export default function Encounter() {
    const { profile: sender } = useContext(GlobalContext)
    const initialGender = sender.gender?.value === 'male' ? 'female' : 'male'

    const [loading, setLoading] = useState(true)
    const [isModalVisible, setModalVisible] = useState(false)
    const [receivers, setReceivers] = useState([])
    const [country, setCountry] = useState(null)
    const [region, setRegion] = useState(null)
    const [gender, setGender] = useState(initialGender)
    const [applyFilter, setApplyFilter] = useState(false)
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => <HeaderLeft title="Tanishuvlar" />,
            headerRight: () => (
                <HeaderRight
                    onPress={() => setModalVisible(true)}
                    icon={<Tuning2 width={26} height={26} color={COLOR.black} />} />
            ),
        })
    }, [navigation])

    useEffect(() => {
        async function fetchReceivers() {
            try {
                setLoading(true)
                const response = await baseAxios.get(PROFILES, { params: { encounter: true, country, region, gender } })
                setReceivers(response.data.results)
            } catch (error) {
                showToast('warning', 'Oops!', 'Internet mavjudligini tekshiring')
            } finally {
                setLoading(false)
                setApplyFilter(false)
            }
        }
        fetchReceivers()
    }, [applyFilter])

    if (loading) {
        return <SkeletonEncounter />
    }

    return (
        <>
            <EncounterCard receivers={receivers} setModalVisible={setModalVisible} />
            <FilterModal
                isModalVisible={isModalVisible}
                setModalVisible={setModalVisible}
                setApplyFilter={setApplyFilter}
                country={country}
                setCountry={setCountry}
                region={region}
                setRegion={setRegion}
                gender={gender}
                setGender={setGender} />
        </>
    )
}
