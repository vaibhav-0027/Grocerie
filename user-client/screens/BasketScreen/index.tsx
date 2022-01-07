import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import ShopInfo from '../../components/ShopInfo';
import SingleMenuItem from '../../components/SingleMenuItem';
import { getCartDataLocal, setCartDataLocal } from '../../utils/localStorage/cartData';
import { getCartShopIdLocal } from '../../utils/localStorage/cartShopId';
import EmptyBasket from './EmptyBasket';
import ShowTotal from '../../components/ShowTotal';
import serverpb from "../../proto/server_pb";
import grpcClient from '../../utils/grpcClient';

type InfoProps = {
    name: string;
    shopId: string;
    locality: string;
    typesList: Array<string>;
    menu: Array<serverpb.MenuItem>;
}

const BasketScreen = () => {

    const [shopId, setShopId] = useState<string>('');
    const [cartData, setCartData] = useState<any>({});
    const [shopInfo, setShopInfo] = useState<InfoProps>({
        name: '',
        locality: '',
        menu: [],
        shopId: '',
        typesList: [],
    });
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
        if(shopId.length === 0 || showEmpty) {
            return ;
        }

        const reqParam = new serverpb.GetShopInfoRequest();

        grpcClient.getShopInfo(reqParam, null, (err: Error, resp: serverpb.GetShopInfoResponse) => {
            if (err) {
                console.error(err);
                return;
            }

            const _currentShop = resp.getShop() || new serverpb.Shop();

            setShopInfo({
                name: _currentShop.getName(),
                locality: _currentShop.getLocality(),
                shopId,
                typesList: _currentShop.getTypesList(),
                menu: [],
            });
        });

        const reqParam2 = new serverpb.GetShopMenuRequest();
        reqParam2.setShopid(shopId);

        grpcClient.getShopMenu(reqParam2, null, (err: Error, resp: serverpb.GetShopMenuResponse) => {
            if (err) {
                console.error(err);
                return;
            }

            setShopInfo((prev: any) => {
                return {
                    ...prev,
                    menu: resp.getMenuList(),
                }
            })
        })
    }, [shopId, showEmpty]);

    useEffect(() => {
        if(!shopInfo) {
            return ;
        }

        let arr: any = {};
        let totalBasket = 0;

        shopInfo.menu.map((item: serverpb.MenuItem) => {
            let obj = {
                [item.getId()]: item,
            }

            arr = {
                ...arr,
                ...obj,
            }

            totalBasket = totalBasket + item.getPrice() * cartData[item.getId()]
        });

        setMenu(arr);
        setTotal(totalBasket);
    }, [shopInfo]);

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

                if(menu[key]) {   
                    totalBasket = totalBasket + cartData[key] * menu[key].getPrice();
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
                        
                        const temp: serverpb.MenuItem = menu[key];
                        if(!temp) {
                            return null;
                        }
                        
                        return (
                            <SingleMenuItem 
                                bestSeller={temp.getBestseller()}
                                category={temp.getCategory()}
                                id={temp.getId()}
                                name={temp.getName()}
                                price={temp.getPrice()}
                                weight={temp.getWeight()}
                                shopId={shopId}
                                key={temp.getId()}
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
                        name={shopInfo.name}
                        locality={shopInfo.locality}
                        type={shopInfo.typesList}
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
