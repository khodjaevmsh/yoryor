import { X } from 'react-native-feather'
import React from 'react'
import AnimatedOverlayLabel from '../components/AnimatedOverlayLabel'
import { COLOR } from './colors'
import { Heart } from '../components/common/Svgs'

export const overlayLabels = {
    left: {
        element: <AnimatedOverlayLabel
            icon={<X height={48} width={48} color={COLOR.black} strokeWidth={3} />}
            color={COLOR.white}
            position="left" />,
        style: { wrapper: { alignItems: 'flex-end', justifyContent: 'center', marginLeft: -50 } },
    },
    right: {
        element: <AnimatedOverlayLabel
            icon={<Heart height={48} width={48} color={COLOR.black} strokeWidth={3} />}
            color={COLOR.white}
            position="right" />,
        style: { wrapper: { alignItems: 'flex-start', justifyContent: 'center', marginLeft: 50 } },
    },
}
