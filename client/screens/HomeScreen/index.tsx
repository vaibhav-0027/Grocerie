import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { shopList } from '../../utils/dummyData'
import SingleShop from './SingleShop'

const HomeScreen = () => {

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
                    shopList.map((data, idx) => {
                        return <SingleShop id={data.id} key={idx} name={data.name} />
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
