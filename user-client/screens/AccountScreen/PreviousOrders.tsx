import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { previousOrdersDummy } from '../../utils/dummyData';
import SinglePreviousOrder from './SinglePreviousOrder';

const PreviousOrders = (props: any) => {

    const userId = props.route.params.info?.uid;
    const [orders, setOrders] = useState<any>([]);

    useEffect(() => {
        //TODO fetch from server instead

        setOrders(previousOrdersDummy);
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            {
                orders?.map((_order: any, idx: number) => {
                    return (
                        <SinglePreviousOrder
                            info={_order}
                            key={idx}
                        />
                    )
                })
            }
        </ScrollView>
    )
}

export default PreviousOrders

const styles = StyleSheet.create({
    scrollViewContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
})
