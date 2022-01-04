import { CommonActions, useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type ShopInfoProps = {
    name: string;
    locality: string;
    type: Array<string>;
    clickable?: boolean;
    shopId?: string;
}

const ShopInfo = (props: ShopInfoProps) => {

    const navigation = useNavigation();

    const pressHandler = () => {
        navigation.dispatch(
            CommonActions.navigate({
                name: 'Shop',
                params: {
                    shopId: props.shopId,
                    name: props.name,
                }
            })
        )
    }

    const _renderTypes = () => {
        return (
            <View style={styles.typesContainer}>
                {
                    props.type.map((_type: string, idx: number) => {
                        return (
                            <View key={idx} style={styles.singleTypeContainer}>
                                <Text style={styles.type}>
                                    {_type}
                                </Text>
                            </View>
                        )
                    })
                }
            </View>
        )
    }

    return props.clickable ? 
        (
            <TouchableOpacity onPress={pressHandler} style={styles.container}>
                <Text style={styles.name}>
                    {props.name}
                </Text>

                <Text style={styles.locality}>
                    {props.locality}
                </Text>

                {_renderTypes()}
            </TouchableOpacity>
        )
        :
        (
            <View style={styles.container}>
                <Text style={styles.name}>
                    {props.name}
                </Text>

                <Text style={styles.locality}>
                    {props.locality}
                </Text>

                {_renderTypes()}
            </View>
        )
}

export default ShopInfo

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        padding: 10,
        backgroundColor: 'white',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginBottom: 10,
    },
    name: {
        fontWeight: '700',
        fontSize: 24,
        color: 'black',
    },
    locality: {
        color: 'gray',
        fontSize: 16,
        fontWeight: '600',
    },
    typesContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
    },
    singleTypeContainer: {
        backgroundColor: '#ebe7dd',
        paddingVertical: 1,
        paddingHorizontal: 4,
        margin: 2,
        borderRadius: 8,
    },
    type: {
        color: 'gray',
        fontSize: 12,
        fontStyle: 'italic',
    },
})
