import React from 'react'
import { StyleSheet } from 'react-native'
import Container from '../../components/common/Container'
import ReceiverBody from '../../components/ReceiverBody'
import ReceiverHead from '../../components/ReceiverHead'

export default function ReceiverDetail({ route }) {
    const { receiver } = route.params

    return (
        <Container scrollable containerStyle={styles.container}>
            <ReceiverHead receiver={receiver} />
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
