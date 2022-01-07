import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons'
import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import serverpb from "../../proto/server_pb";
import { setCartDataLocal } from '../../utils/localStorage/cartData';
import { setCartShopIdLocal } from '../../utils/localStorage/cartShopId';

type SinglePreviousOrderProps = {
    info: serverpb.PreviousOrderDetails;
}

const SinglePreviousOrder = (props: SinglePreviousOrderProps) => {
    
    const { info } = props;
    const navigation = useNavigation();

    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [shopInfo] = useState<serverpb.Shop>(info.getShopinfo() || new serverpb.Shop());
    const [orderInfo] = useState<serverpb.Order>(info.getOrderinfo() || new serverpb.Order());
    const [itemsInfo] = useState<serverpb.MenuItem[]>(info.getItemsinfoList());
    const [orderDetailsJson, setOrderDetailsJson] = useState<any>();

    useEffect(() => {
        setOrderDetailsJson(JSON.parse(orderInfo.getOrderdetails()));
    }, [orderInfo]);

    const reorderPressHandler = () => {
        setCartShopIdLocal(shopInfo.getId());

        let tempCart: any = {};

        itemsInfo.forEach((_menuItem: serverpb.MenuItem) => {
            tempCart = {
                ...tempCart,
                [_menuItem.getId()]: 0,
            }
        });

        Object.keys(orderDetailsJson).forEach((key: string) => {
            if (key in tempCart) {
                tempCart = {
                    ...tempCart,
                    [key]: orderDetailsJson[key],
                }
            }
        });

        setCartDataLocal(JSON.stringify(tempCart)).then(() => {
            navigation.dispatch(
                CommonActions.navigate({
                    name: 'Basket',
                })
            )
        });
    }

    const rateOrderPressHandler = () => {
        alert("To be implemented!");
    }

    const _renderArrow = () => {
        return (
            <View style={{marginLeft: 4,}}>
                {
                    showDetails ? 
                        <AntDesign name="caretup" size={14} color="black" />
                        :
                        <AntDesign name="caretdown" size={14} color="black" />
                }
            </View>
        )
    }

    const _renderButtons = () => {
        return (
            <View style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                <View style={{width: '50%', alignItems: 'center'}}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={reorderPressHandler}
                    >
                        <Text 
                            style={{color: 'white', fontWeight: 'bold', fontSize: 18,}}
                        >
                            Reorder
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{width: '50%'}}>
                    <TouchableOpacity
                        style={[styles.button, {width: '75%'}]}
                        onPress={rateOrderPressHandler}
                    >
                        <Text 
                            style={{color: 'white', fontWeight: 'bold', fontSize: 18,}}
                        >
                            Rate Order
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const _renderOrderDetails = () => {

        const _calcWeight = (weight: number) => {
            if(weight <= 999) {
                return weight + ' g';
            }
    
            let kgs = weight/1000;
            return `${kgs} kg`;
        }

        return (
            <View 
                style={{
                    borderStyle: 'dashed', borderTopWidth: 1, borderColor: 'gray',
                    marginVertical: 10,
                }}
            >
                {
                    itemsInfo.map((_current: serverpb.MenuItem, idx: number) => {

                        if (orderDetailsJson && !orderDetailsJson[`${_current.getId()}`]) {
                            return null;
                        }

                        return (
                            <View
                                key={idx}
                                style={{
                                    display: 'flex', flexDirection: 'row',
                                    alignItems: 'center', justifyContent: 'space-between',
                                    paddingHorizontal: 14,
                                }}
                            >
                                <Text style={{fontSize: 16, color: 'gray',}} numberOfLines={1}>
                                    { _current.getName() } - {_calcWeight( _current.getWeight() )}
                                </Text>

                                <View style={{
                                    display: 'flex', flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <Feather style={{marginTop: 2,}} name="x" size={16} color="gray" />
                                    <Text style={{fontSize: 16, color: 'gray',}}>
                                        { orderDetailsJson && orderDetailsJson[`${_current.getId()}`] }
                                    </Text>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        )
    }

    return (
        <View 
            style={{
                display: 'flex', flexDirection: 'column', backgroundColor: 'white',
                marginVertical: 4, marginHorizontal: 6, borderRadius: 10,
                padding: 5,
            }}
        >
            <View style={styles.container}>
                <View style={styles.shopInfoContainer}>
                    <Text style={styles.shopNameText}>{shopInfo.getName()}</Text>
                    <Text style={styles.localityText}>{shopInfo.getLocality()}</Text>
                </View>

                <TouchableOpacity 
                    onPress={() => setShowDetails(!showDetails)} 
                    style={{alignItems: 'center', display: 'flex', flexDirection: 'row'}}
                >
                    <FontAwesome 
                        name="inr" 
                        size={20} 
                        color="black" 
                        style={{marginTop: 2}} 
                    />

                    <Text style={styles.totalPriceText}>
                        { orderInfo.getTotalprice() }
                    </Text>
                    
                    { _renderArrow() }
                </TouchableOpacity>
            </View>

            { _renderButtons() }

            { showDetails && _renderOrderDetails() }
        </View>
    )
}

export default SinglePreviousOrder

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        minHeight: 50,
        marginVertical: 4,
        marginHorizontal: 6,
        borderRadius: 10,
        padding: 5,
        justifyContent: 'space-between',
    },
    shopInfoContainer: {
        flex: 1,
        height: '100%',
    },
    shopNameText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    localityText: {
        color: 'gray',
        fontStyle: 'italic',
        fontSize: 14,
    },
    totalPriceText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    button: {
        backgroundColor: 'green',
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 8,
        width: '50%',
        alignItems: 'center',
    },
})
