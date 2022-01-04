import { Entypo, FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type MenuItem = {
    name: string;
    price: number;
    id: string;
    category: string;
    bestSeller: boolean;
    weight: number;
    shopId: string;
    cart: any;
    updateCart: (itemId: string, newCount: number) => void;
}

const SingleMenuItem = (props: MenuItem) => {

    const [count, setCount] = useState<number>(props.cart[props.id]);

    useEffect(() => {
        setCount(props.cart[props.id]);
    }, [props.cart]);

    const decreaseCountHandler = () => {
        props.updateCart(props.id, props.cart[props.id] - 1);
        setCount(props.cart[props.id] - 1);
    }

    const increaseCountHandler = () => {
        props.updateCart(props.id, props.cart[props.id] + 1);
        setCount(props.cart[props.id] + 1);
    }

    const _calculateWeight = () => {

        if(props.weight <= 999) {
            return props.weight + ' g';
        }

        let kgs = props.weight/1000;
        return `${kgs} kg`
    }

    const _renderBestSeller = () => {
        return (
            <View style={styles.bestSellerView}>
                <FontAwesome name="star" size={16} color="orange" />
                <Text style={styles.bestSellerText}>Best Seller</Text>
            </View>

        )
    }

    const _renderItemInfo = () => {
        return (
            <View style={styles.infoContainer}>
                {
                    props.bestSeller ? 
                        _renderBestSeller()
                        :
                        null
                }
                <Text style={styles.itemNameText} numberOfLines={3}>
                    {props.name}
                </Text>
                <Text style={styles.itemPriceText}>
                    ₹{props.price} - {_calculateWeight()}
                </Text>
            </View>
        )
    }

    const _renderAddButton = () => {
        return (
            <TouchableOpacity 
                onPress={increaseCountHandler}
                style={styles.addButton}
            >
                <Text style={styles.addButtonText}>
                    ADD
                </Text>
            </TouchableOpacity>
        )
    }

    const _renderQuantitySelector = () => {
        return (
            <View style={styles.countChangeContainer}>
                <TouchableOpacity style={styles.plusMinusButtonText} onPress={decreaseCountHandler} >
                    <Entypo name="minus" size={20} color="black" />    
                </TouchableOpacity>

                <TouchableOpacity style={styles.countText}>
                    <Text>
                        {count}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.plusMinusButtonText} onPress={increaseCountHandler} >
                    <Entypo name="plus" size={20} color="green" />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {_renderItemInfo()}

            <View style={styles.quantityContainer}>
                {
                    count === 0 ? 
                        _renderAddButton()
                        :
                        _renderQuantitySelector()
                }
            </View>
        </View>
    )
}

export default SingleMenuItem

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        minHeight: 80,
        marginVertical: 2,
        marginHorizontal: 12,
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'row'
    },
    infoContainer: {
        width: '70%',
        borderRadius: 4,
        padding: 6,
    },
    quantityContainer: {
        width: '30%',
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: 'white',
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 5,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    },
    addButtonText: {
        color: 'green',
        fontWeight: '700',
    },
    countChangeContainer: {
        width: '70%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 5,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    },
    countText: {
        width: '30%',
        fontWeight: '700',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'green',
        fontSize: 20,
    },
    plusMinusButtonText: {
        fontWeight: '700',
        width: '45%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemNameText: {
        fontSize: 20,
        fontWeight: '700',
    },
    itemPriceText: {
        fontSize: 14,
        fontStyle: 'italic',
        color: 'gray',
    },
    bestSellerView: {
        display: 'flex',
        flexDirection: 'row',
        fontSize: 16,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 10,
    },
    bestSellerText: {
        color: 'orange',
        fontSize: 16,
        marginLeft: 4,
        fontWeight: '600',
        fontStyle: 'italic',
    }
})
