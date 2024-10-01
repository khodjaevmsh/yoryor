import React, { useEffect, useState } from 'react'
import { Alert, Platform } from 'react-native'
import * as RNIap from 'react-native-iap'
import Config from 'react-native-config'
import { baseAxios } from '../hooks/requests'
import { showToast } from './common/Toast'
import Button from './common/Button'

export default function Subscriptions() {
    return (
        <>
            {products.map((product) => (
                <Button
                    key={product.productId}
                    title={`Subscribe to ${product.title}`}
                    onPress={() => handlePurchase(product.productId)}
                />
            ))}
        </>
    )
}
