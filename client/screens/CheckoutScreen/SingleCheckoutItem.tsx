import { Feather } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type SingleItemProps = {
    name: string;
    price: number;
    qty: number;
    weight: number;
}

const SingleCheckoutItem = (props: SingleItemProps) => {

    const _getWeight = () => {
        if(props.weight <= 999) {
            return props.weight + ' g';
        }

        let kgs = props.weight/1000;
        return `${kgs} kg`;
    }

    return (
        <View style={styles.container}>
            <View style={styles.itemInfoContainer}>
                <View style={styles.itemNameContainer}>
                    <Text numberOfLines={1} style={styles.itemNameText}>
                        { props.name }
                    </Text>
                </View>

                <View style={styles.itemPriceContainer}>
                    <Text style={styles.itmePriceText}>
                        ₹{ props.price } - {_getWeight()}
                    </Text>
                </View>
            </View>

            <View style={styles.qtyContainer}>
                <Text style={styles.qtyText}>
                    <Feather name="x" size={15} color="black" />
                    {props.qty}
                </Text>
            </View>

            <View style={styles.totalPriceContainer}>
                <Text style={styles.totalPriceText}>₹{ props.price * props.qty }</Text>
            </View>
        </View>
    )
}

export default SingleCheckoutItem

const styles = StyleSheet.create({
    container: {
        width: '95%',
        marginVertical: 2,
        marginHorizontal: 4,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 2,
        paddingHorizontal: 4,
        borderRadius: 10,
    },
    itemInfoContainer: {
        width: '50%',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 4,
    },
    itemNameContainer: {},
    itemNameText: {
        fontSize: 15,
    },
    itemPriceContainer: {},
    itmePriceText: {
        fontSize: 12,
        fontStyle: 'italic',
        color: 'gray',
    },
    qtyContainer: {
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    qtyText: {
        fontSize: 15,
    },
    totalPriceContainer: {
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    totalPriceText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
})
