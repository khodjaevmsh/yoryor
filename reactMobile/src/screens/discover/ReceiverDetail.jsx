import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import Container from '../../components/common/Container'
import ReceiverBody from '../../components/ReceiverBody'
import ReceiverHead from '../../components/ReceiverHead'
import { baseAxios } from '../../hooks/requests'
import { LIKE } from '../../urls'

export default function ReceiverDetail({ route }) {
    const [like, setLike] = useState(null)
    const { receiver } = route.params

    useEffect(() => {
        async function fetchLike() {
            try {
                const likeResponse = await baseAxios.get(LIKE.replace('{id}', receiver.id))
                setLike(likeResponse.data)
            } catch (error) {
                console.log(error.response)
            }
        }
        fetchLike()
    }, [receiver])

    return (
        <Container scrollable containerStyle={styles.container}>
            <ReceiverHead receiver={receiver} like={like} setLike={setLike} />
            <ReceiverBody receiver={receiver} />
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingBottom: 52,
    },
})
