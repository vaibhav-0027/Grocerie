import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import SinglePreviousOrder from './SinglePreviousOrder';

import serverpb from "../../proto/server_pb";
import grpcClient from '../../utils/grpcClient';

const PreviousOrders = (props: any) => {

    const userId = props.route.params.info?.uid;
    const [orders, setOrders] = useState<serverpb.PreviousOrderDetails[]>([]);

    useEffect(() => {
        const reqParam = new serverpb.GetPreviousOrdersRequest();
        reqParam.setUserid(userId);

        grpcClient.getPreviousOrders(reqParam, null, (err: Error, resp: serverpb.GetPreviousOrdersResponse) => {
            if (err) {
                console.error(err);

                return ;
            }

            setOrders(resp.getOrdersList());
        })
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            {
                orders.map((_order: serverpb.PreviousOrderDetails, idx: number) => {
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
