import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import ShopInfo from '../../components/ShopInfo';
import SingleMenuItem from '../../components/SingleMenuItem';
import { shopInfo } from '../../utils/dummyData';
import { getCartDataLocal, setCartDataLocal } from '../../utils/localStorage/cartData';
import { getCartShopIdLocal } from '../../utils/localStorage/cartShopId';
import EmptyBasket from './EmptyBasket';
import ShowTotal from '../../components/ShowTotal';

type ItemProp = {
    name: string;
    price: number;
    id: string;
    category: string;
    bestSeller: boolean;
    weight: number;
}

type InfoProps = {
    name: string;
    id: string;
    locality: string;
    type: Array<string>;
    menu: Array<ItemProp>;
}

const BasketScreen = () => {

    const [shopId, setShopId] = useState<string>('');
    const [cartData, setCartData] = useState<any>({});
    const [info, setInfo] = useState<InfoProps>();
    const [showEmpty, setShowEmpty] = useState(true);
    const [menu, setMenu] = useState<any>();
    const [firstLoad, setFirstLoad] = useState(true);
    const [total, setTotal] = useState(0);

    const updateCartData = (itemId: string, newCount: number) => {
        setCartData((prev: any) => {
            return {
                ...prev,
                [itemId]: newCount,
            }
        });
    }

    // fetch shopId and cartData from local storage when page loads
    useEffect(() => {
        const method = async () => {
            const cartDataString = await getCartDataLocal();
            const cartDataTemp = JSON.parse(cartDataString);

            const shopIdTemp = await getCartShopIdLocal();

            setCartData(cartDataTemp);
            setShopId(shopIdTemp);
        }

        method();
    }, []);

    // fetch shop information when shopId is loaded from local storage
    useEffect(() => {
        if(shopId.length === 0) {
            return ;
        }

        // TODO: fetch shop info from server -> shopInfo
        setInfo(shopInfo);
    }, [shopId]);

    useEffect(() => {
        if(!info) {
            return ;
        }

        let arr: any = {};
        let totalBasket = 0;

        info.menu.map((item) => {
            let obj = {
                [item.id]: item,
            }

            arr = {
                ...arr,
                ...obj,
            }

            totalBasket = totalBasket + item.price * cartData[item.id]
        });

        setMenu(arr);
        setTotal(totalBasket);
    }, [info]);

    // check if the basket is empty on every update of cartData
    useEffect(() => {
        if(Object.keys(cartData).length === 0) {
            return setShowEmpty(true);
        }

        let showEmptyTemp = true;
        let totalBasket = 0;
        Object.keys(cartData).forEach((key: string) => {
            if(cartData[key] !== 0) {
                showEmptyTemp = false;

                if(menu) {   
                    totalBasket = totalBasket + cartData[key] * menu[key].price;
                }
            }
        });

        setShowEmpty(showEmptyTemp);
        setTotal(totalBasket);
    }, [cartData]);

    // update cartData in local storage on any change
    useEffect(() => {
        if(firstLoad) {
            return setFirstLoad(false);
        }

        const method = async () => {
            await setCartDataLocal(JSON.stringify(cartData))
        }

        method();
    }, [cartData]);

    const _renderCartItems = () => {
        return(
            <View>
                {
                    Object.keys(cartData).map((key: string) => {
                        if(cartData[key] === 0 || !menu) {
                            return null;
                        }
                        
                        const temp: ItemProp = menu[key];
                        
                        return (
                            <SingleMenuItem 
                                bestSeller={temp.bestSeller}
                                category={temp.category}
                                id={temp.id}
                                name={temp.name}
                                price={temp.price}
                                weight={temp.weight}
                                shopId={shopId}
                                key={temp.id}
                                cart={cartData}
                                updateCart={updateCartData}
                            />
                        )
                    })
                }
            </View>
        )   
                    
    }

    return showEmpty ? 
        <EmptyBasket />
        :
        (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    <ShopInfo
                        name={info?.name || 'Temp'}
                        locality={info?.locality || 'somewhere'}
                        type={info?.type || ['chinese', 'mexican']}
                        clickable
                        shopId={shopId}
                    />

                    { _renderCartItems()}
                </ScrollView>

                <ShowTotal 
                    total={total}
                    destination='Checkout'
                    params={{
                        cartData,
                        shopId,
                        menu,
                    }}
                />
            </View>
        )
}

export default BasketScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContainer: {
        width: '100%'
    },

})
