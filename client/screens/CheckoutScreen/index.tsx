import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import * as React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AddressSelector from './AddressSelector';
import SingleCheckoutItem from './SingleCheckoutItem';

const CheckoutScreen = (props: any) => {

    const cartData = props.route.params.cartData;
    const shopId = props.route.params.shopId;
    const menu = props.route.params.menu;

    const [total, setTotal] = useState(0);
    const [renderTotal, setRenderTotal] = useState(false);
    const [addressId, setAddressId] = useState<string>('');

    useEffect(() => {
        let sum = 0;
        Object.keys(cartData).forEach((key) => {
            sum = sum + cartData[key] * menu[key].price;
        });
        setTotal(sum);
        setRenderTotal(true);
    }, [cartData]);

    const placeOrderHandler = () => {
        if(!addressId) {
            return alert("Select delivery address!");
        }
    }

    const _renderOrderList = () => {
        return (
            <View style={styles.listContainer}>
                {
                    Object.keys(cartData).map((key, idx) => {
                        if(cartData[key] === 0) {
                            return null
                        }

                        return (
                            <SingleCheckoutItem
                                key={idx}
                                name={menu[key].name}
                                price={menu[key].price}
                                qty={cartData[key]}
                                weight={menu[key].weight}
                            />
                        )
                    })
                }
            </View>
        )
    }

    const _renderTotalBillBreakdown = () => {
        return (
            <View style={styles.billBreakdownContainer}>
                <View style={styles.itemsTotalContainer}>
                    <Text style={styles.itemTotalText}>
                        Total:
                    </Text>
                    <Text style={styles.itemTotalText}>
                        <FontAwesome name="inr" size={16} color="black" /> 
                        { total }
                    </Text>
                </View>

                <View style={styles.itemsTotalContainer}>
                    <Text style={styles.itemTotalText}>
                        Delivery fees:
                    </Text>
                    <Text style={styles.itemTotalText}>
                        <FontAwesome name="inr" size={16} color="black" />
                        20
                    </Text>
                </View>
            </View>
        )
    }

    const _renderTotalBill = () => {
        return (
            <View style={styles.totalBillContainer}>
                <Text style={styles.totalBillText}>
                    Total: 
                </Text>
                <Text style={styles.totalBillText}>
                    <FontAwesome name="inr" size={24} color="black" />
                    { total + 20 }
                </Text>
            </View>
        )
    }

    return (
        <View style={{flex: 1}}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.orderSummaryText}>
                    Order Summary
                </Text>

                { _renderOrderList() }

                { renderTotal && _renderTotalBillBreakdown() }
                { renderTotal && _renderTotalBill() }

                <AddressSelector 
                    addressId={addressId}
                    setAddressId={setAddressId}
                />
            </ScrollView>

            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    minHeight: 50,
                    maxHeight: 50,
                    paddingRight: 10,
                    paddingBottom: 4,
                }}
            >
                <View style={{width: '65%'}}>

                </View>
                <TouchableOpacity style={styles.placeOrderContainer} onPress={placeOrderHandler}>
                    <Text style={styles.placeOrderText}>
                        Place Order
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CheckoutScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    orderSummaryText: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    listContainer: {
        width: '100%',
        alignItems: 'center',
    },
    billBreakdownContainer: {
        borderTopWidth: 2,
        borderTopColor: 'lightgray',
        width: '100%',
        paddingVertical: 4,
        paddingHorizontal: 8,
        marginTop: 4,
    },
    itemsTotalContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemTotalText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    deliveryFeesContainer: {},
    totalBillContainer: {
        borderTopWidth: 2,
        borderTopColor: 'lightgray',
        width: '100%',
        paddingVertical: 4,
        paddingHorizontal: 8,
        marginTop: 4,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    totalBillText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    placeOrderContainer: {
        borderRadius: 10,
        backgroundColor: 'green',
        width: '35%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeOrderText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    }
})
