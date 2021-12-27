import { AntDesign } from '@expo/vector-icons'
import { CommonActions, useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type ShowTotalProps = {
    total: number;
    destination: string;
    params?: any;
}

const ShowTotal = (props: ShowTotalProps) => {

    const navigation = useNavigation();

    const _redirectToPayment = () => {
        navigation.dispatch(
            CommonActions.navigate({
                name: props.destination,
                params: props.params || {},
            })
        )
    }

    return (
        <TouchableOpacity
            onPress={_redirectToPayment}
            style={styles.container}
        >
            <Text style={styles.totalText}>
                Total: 
            </Text>

            <View style={styles.priceContainer}>
                <Text style={styles.priceText}>
                    ₹{props.total}
                </Text>

                <AntDesign 
                    name="right" 
                    size={20} 
                    color="white" 
                    style={styles.rightArrow}
                />
            </View>
        </TouchableOpacity>
    )
}

export default ShowTotal

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'green',
        minHeight: 60,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 3,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    totalText: {
        fontSize: 24,
        fontWeight: '700',
        color: 'white',
    },
    priceContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    priceText: {
        fontSize: 24,
        fontWeight: '700',
        color: 'white',
    },
    rightArrow: {
        fontWeight: '700',
        marginTop: 4,
    },
})
