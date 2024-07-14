import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import normalize from 'react-native-normalize'
import FastImage from 'react-native-fast-image'
import RoundedTagWithIcon from './RoundedTagWithIcon'
import { COLOR } from '../utils/colors'
import { AcademicCap, CaseRound, Dollar, Heart, Ruler, Stars, Weigher } from './common/Svgs'
import { levels, maritalStatus, incomeLevels, zodiacs } from '../utils/choices'
import { domain } from '../hooks/requests'

const { height: screenHeight } = Dimensions.get('window')
const imageHeight = screenHeight * 0.66

export default function ReceiverBody({ receiver }) {
    const fields = [
        { icon: <Heart width={20} height={20} />, text: maritalStatus[receiver.maritalStatus] },
        { icon: <AcademicCap width={20} height={20} />, text: levels[receiver.educationLevel] },
        { icon: <CaseRound width={20} height={20} />, text: receiver.jobTitle },
    ]

    const additionalFields = [
        { icon: <Dollar width={20} height={20} />, text: incomeLevels[receiver.incomeLevel] },
        { icon: <Ruler width={20} height={20} />, text: receiver.height },
        { icon: <Weigher width={20} height={20} />, text: receiver.weight },
        { icon: <Stars width={20} height={20} />, text: zodiacs[receiver.zodiac] },
    ]

    const renderFastImages = () => {
        if (!receiver || !receiver.images) return null

        return receiver.images.slice(1, 6).map((imageObj, index) => (
            imageObj ? (
                <FastImage
                    key={index}
                    style={[styles.image, { marginTop: index === 0 ? 38 : 0 }]}
                    source={{
                        uri: `${domain + imageObj.image}`,
                        priority: FastImage.priority.normal,
                        cache: FastImage.cacheControl.web,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
            ) : null
        ))
    }

    return (
        <View>
            {receiver.bio ? (
                <View style={styles.informationWrapper}>
                    <Text style={[styles.informationTitle]}>O'zi haqida</Text>
                    <View style={[styles.tagsWrapper]}>
                        <Text style={[styles.informationSubTitle, {
                            fontSize: normalize(19),
                            lineHeight: 26,
                            marginBottom: 6,
                        }]}>
                            {receiver.bio}
                        </Text>
                    </View>
                </View>
            ) : null}

            <View style={styles.informationWrapper}>
                {fields.some((field) => field.text !== null && field.text !== undefined) && (
                    <Text style={styles.informationTitle}>Ma'lumotlar</Text>
                )}
                <View style={styles.tagsWrapper}>
                    {fields.map((field, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        field.text && <RoundedTagWithIcon key={index} icon={field.icon} text={field.text} />
                    ))}
                </View>
            </View>

            <View style={styles.informationWrapper}>
                {additionalFields.some((field) => field.text !== null && field.text !== undefined) && (
                    <Text style={styles.informationTitle}>Qo'shimcha ma'lumotlar</Text>
                )}
                <View style={styles.tagsWrapper}>
                    {additionalFields.map((field, index) => (
                        field.text && (
                            // eslint-disable-next-line react/no-array-index-key
                            <RoundedTagWithIcon key={index} icon={field.icon} text={field.text} />
                        )
                    ))}
                </View>
            </View>

            {receiver.educationSchool ? (
                <View style={[styles.informationWrapper]}>
                    <Text style={styles.informationTitle}>O'qish joyi</Text>
                    <Text style={styles.informationSubTitle}>{receiver.educationSchool}</Text>
                </View>
            ) : null}

            {receiver.jobCompany ? (
                <View style={styles.informationWrapper}>
                    <Text style={styles.informationTitle}>Ish joyi</Text>
                    <Text style={styles.informationSubTitle}>{receiver.jobCompany}</Text>
                </View>
            ) : null}

            <View>
                {renderFastImages()}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    informationWrapper: {
        flex: 1,
        marginTop: 24,
        marginHorizontal: 15,
    },
    informationTitle: {
        fontSize: normalize(16),
        marginBottom: 10,
        color: COLOR.grey,
        fontWeight: '500',
    },
    informationSubTitle: {
        fontSize: normalize(22),
        fontWeight: '600',
        color: COLOR.black,
    },
    tagsWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    image: {
        width: '100%',
        height: imageHeight,
        borderRadius: 0,
    },
})
