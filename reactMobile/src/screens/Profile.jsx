import React, { useContext, useState } from 'react'
import { Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Container from '../components/common/Container'
import Button from '../components/common/Button'
import { baseAxios } from '../hooks/requests'
import { SIGN_OUT } from '../urls'
import { GlobalContext } from '../context/GlobalContext'
import ServerError from '../components/common/ServerError'

export default function Profile() {
    const [loading, setLoading] = useState(false)
    const [serverError, setServerError] = useState(false)
    const { signOut } = useContext(GlobalContext)
    const navigation = useNavigation()

    async function onSingOut() {
        try {
            setLoading(true)
            await baseAxios.delete(SIGN_OUT)
            await signOut()
            navigation.reset({ index: 0, routes: [{ name: 'Splash' }] })
        } catch (error) {
            setServerError(error.response)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container>
            <Button title="Chiqish" onPress={onSingOut} loading={loading} />
            <ServerError error={serverError} />
        </Container>
    )
}
