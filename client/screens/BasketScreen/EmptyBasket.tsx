import { MaterialCommunityIcons } from '@expo/vector-icons'
import { CommonActions, useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const EmptyBasket = () => {

    const navigation = useNavigation();

    const pressHandler = () => {
        navigation.dispatch(
            CommonActions.navigate({
                name: 'Home',
            })
        )
    }

    return (
        <View style={styles.container}>
            <MaterialCommunityIcons name="cart-remove" size={150} color="black" />
            
            <Text style={styles.emptyText}>
                Looks like your basket is empty!
            </Text>
            
            <TouchableOpacity
                onPress={pressHandler}
                style={styles.shopNowContainer}
            >
                <Text style={styles.shopNowText}>
                    Shop Now!
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default EmptyBasket

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    emptyText: {
        color: 'lightgray',
        fontWeight: '700',
        fontSize: 50,
    },
    shopNowContainer: {
        backgroundColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'green',
        paddingVertical: 4,
        paddingHorizontal: 8,
        marginTop: 100,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    },
    shopNowText: {
        fontSize: 30,
        fontWeight: '900',
        color: 'green'
    },
})
