import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { shopList } from '../../utils/dummyData'
import SingleShop from './SingleShop'
import serverpb from "../../proto/server_pb";
import grpcClient from '../../utils/grpcClient';

const HomeScreen = () => {

    const [shopList, setShopList] = useState<serverpb.Shop[]>([]);

    useEffect(() => {
        const reqParam = new serverpb.GetShopListRequest();

        grpcClient.getShopList(reqParam, null, (err: Error, resp: serverpb.GetShopListResponse) => {
            if (err) {
                console.error(err);
                return;
            }

            setShopList(resp.getShopsList())
        });
    }, []);

    const _renderShopList = () => {
        return (
            <ScrollView
                contentContainerStyle={styles.scrollViewContainer}
                style={{width: '100%'}}
            >
                <View>
                    <Text style={styles.shopListHeading}>All Shops Nearby</Text>
                    <Text style={styles.shopListSubHeading}>Discover all household items near you</Text>
                </View>

                {
                    shopList.map((data: serverpb.Shop, idx: number) => {
                        return (
                            <SingleShop 
                                id={data.getId()} 
                                key={idx} 
                                name={data.getName()}
                                typesList={data.getTypesList()}
                                locality={data.getLocality()}
                            />
                        )
                    })
                }
            </ScrollView>
        )
    }

    return (
        <View style={styles.container}>
            
            {_renderShopList()}
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollViewContainer: {
        width: '100%',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
    },
    shopListHeading: {
        fontWeight: '700',
        fontSize: 24,
        marginLeft: -60,
    },
    shopListSubHeading: {
        fontWeight: '200',
        fontSize: 14,
        marginLeft: -60,
    },
})
