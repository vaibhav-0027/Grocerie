import { CommonActions, useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

/**
 * TODO: remove optional tag from type
 */
type SingleShopProps = {
    id: string;
    name: string;
    typesList: Array<string>;
    locality: string;
}

const SingleShop = (props: SingleShopProps) => {

    const navigation = useNavigation();

    const shopPressHandler = () => {
        navigation.dispatch(
            CommonActions.navigate({
                name: 'Shop',
                params: {
                    shopId: props.id,
                    name: props.name,
                    locality: props.locality,
                    typesList: props.typesList,
                    menu: [],
                }
            })
        )
    }

    const _renderShopImage = () => {
        return (
            <View style={styles.imageContainer}>
                <Image 
                    source={{uri: "https://picsum.photos/200/300"}} 
                    style={styles.image}    
                />
            </View>
        )
    }

    const _renderShopInformation = () => {
        return (
            <View style={styles.infoContainer}>
                <Text
                    numberOfLines={1} 
                    style={styles.shopName}
                >
                    {props.name}
                </Text>

                <View style={{display: 'flex', flexDirection: 'row'}}>
                    {
                        props.typesList.map((_type: string, idx: number) => {
                            return (
                                <Text key={idx} style={styles.shopType}>
                                    { _type }
                                    {
                                        ( idx !== props.typesList.length - 1 ) && ", "
                                    }
                                </Text>
                            )
                        })
                    }
                </View>

                <Text style={styles.shopLocation}>
                    { props.locality }
                </Text>
            </View>
        )
    }

    return (
        <TouchableOpacity onPress={shopPressHandler} style={styles.container}>
            {_renderShopImage()}

            {_renderShopInformation()}
        </TouchableOpacity>
    )
}

export default SingleShop

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        marginTop: 12,
        marginBottom: 12,
        minHeight: 100,
        maxHeight: 100,
        borderRadius: 12,
    },
    imageContainer: {
        width: '30%',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    infoContainer: {
        width: '70%',
        padding: 10,
        borderRadius: 10, 
        paddingLeft: 24,
    },
    shopName: {
        fontSize: 20,
        fontWeight: '700',
    },
    shopLocation: {
        fontSize: 10,
        color: 'gray',
        fontStyle: 'italic',
    },
    shopType: {
        fontSize: 12,
        color: 'gray',
        fontStyle: 'italic',
        marginTop: 8,
    }
})
