import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const SinglePreviousOrder = (props: any) => {
    
    const { info } = props;

    const [showDetails, setShowDetails] = useState<boolean>(false);

    const reorderPressHandler = () => {

    }

    const rateOrderPressHandler = () => {
        
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
                return props.weight + ' g';
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
                    info.orderDetails.map((_current: any, idx: number) => {
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
                                    {_current.name} - {_calcWeight(_current.weight)}
                                </Text>

                                <View style={{
                                    display: 'flex', flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <Feather style={{marginTop: 2,}} name="x" size={16} color="gray" />
                                    <Text style={{fontSize: 16, color: 'gray',}}>{_current.qty}</Text>
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
                    <Text style={styles.shopNameText}>{info.shopName}</Text>
                    <Text style={styles.localityText}>{info.shopLocality}</Text>
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

                    <Text style={styles.totalPriceText}>{info.totalPrice}</Text>
                    
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
