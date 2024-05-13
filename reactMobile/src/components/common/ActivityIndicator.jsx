import { ActivityIndicator } from 'react-native'
import React from 'react'
import { COLOR } from '../../utils/colors'

export default function ActiveIndicator({ color = COLOR.lightGrey }) {
    return (
        <ActivityIndicator size="large" style={{ transform: [{ scale: 0.88 }] }} color={color} />
    )
}
