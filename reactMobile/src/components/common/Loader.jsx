import React from 'react'
import { ActivityIndicator } from 'react-native'

export default function Loader({
    size = 'small',
    color = 'black',
    animating = true,
    hidesWhenStopped = true,
}) {
    return <ActivityIndicator size={size} color={color} animating={animating} hidesWhenStopped={hidesWhenStopped} />
}
