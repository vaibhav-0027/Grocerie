import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { clearCartDataLocal, getCartDataLocal, setCartDataLocal } from '../../utils/localStorage/cartData';
import { getCartShopIdLocal, setCartShopIdLocal } from '../../utils/localStorage/cartShopId';
import Categories from './Categories';
import ShopInfo from '../../components/ShopInfo';
import ShowTotal from '../../components/ShowTotal';
import grpcClient from '../../utils/grpcClient';
import serverpb from "../../proto/server_pb";

type InfoProps = {
    name: string;
    shopId: string;
    locality: string;
    typesList: Array<string>;
    menu: Array<serverpb.MenuItem>;
}

type SingleCategoryProp = {
    title: string;
    data: Array<serverpb.MenuItem>;
}

const ShopScreen = (props: any) => {

    const [shopInfo, setShopInfo] = useState<InfoProps>(props.route.params);

    const [categories, setCategories] = useState<SingleCategoryProp[]>();
    const [cart, setCart] = useState<any>({});
    const [firstLoad, setFirstLoad] = useState(true);
    const [total, setTotal] = useState(0);
    const [menu, setMenu] = useState<any>();

    const updateCart = (itemId: string, newCount: number) => {
        setCart((prev: any) => {
            return {
                ...prev,
                [itemId]: newCount,
            }
        });
    }

    useEffect(() => {
        const reqParam = new serverpb.GetShopMenuRequest();
        reqParam.setShopid(shopInfo.shopId);

        grpcClient.getShopMenu(reqParam, null, (err: Error, resp: serverpb.GetShopMenuResponse) => {
            if (err) {
                console.error(err);
                return;
            }

            setShopInfo({
                ...shopInfo,
                menu: resp.getMenuList(),
            });
        });
    }, []);

    // check if already stored info is same as this shop info
    useEffect(() => {

        if(!shopInfo)
            return;

        const method = async () => {
            const cartShopId = await getCartShopIdLocal();

            let tempCart: any = {};
            let newData: any = {bestseller: []};
            let tempMenu: any = {};

            shopInfo.menu.forEach((data: serverpb.MenuItem) => {
                tempCart = {
                    ...tempCart,
                    [data.getId()]: 0,
                }

                tempMenu = {
                    ...tempMenu,
                    [data.getId()]: data,
                }

                if(data.getBestseller()) {
                    newData = {
                        ...newData,
                        bestseller: [
                            ...newData['bestseller'],
                            data,
                        ]
                    }
                }

                if(!newData[data.getCategory()]) {
                    newData = {
                        ...newData,
                        [data.getCategory()]: [data],
                    };
                } else {
                    newData = {
                        ...newData,
                        [data.getCategory()]: [
                            ...newData[data.getCategory()],
                            data
                        ]
                    };
                }
            })

            let arr: SingleCategoryProp[] = [];

            arr.push({title: "BestSellers", data: newData['bestseller']});
            newData['bestseller'] = null;
            
            Object.keys(newData).forEach((key) => {

                if(!newData[key])
                    return;

                let obj = {
                    title: key,
                    data: newData[key],
                }
                arr.push(obj);
            });

            setCategories(arr);
            setMenu(tempMenu);

            if(cartShopId === shopInfo.shopId) {
                let cartDataString = await getCartDataLocal();
                let cartData = JSON.parse(cartDataString);

                setCart({
                    ...tempCart,
                    ...cartData,
                });

            } else {
                setCart(tempCart);
            }
        }

        method();
    }, [shopInfo]);

    // updating local cartData on any change in selected items
    useEffect(() => {
        if(firstLoad) {
            return setFirstLoad(false);
        }

        const method = async () => {
            const cartShopId = await getCartShopIdLocal();

            if(cartShopId !== shopInfo.shopId) {
                // TODO: ask if clear cart?
                await clearCartDataLocal();
                await setCartShopIdLocal(shopInfo.shopId);
            } 

            await setCartDataLocal(JSON.stringify(cart));

            let cartTotal = 0;
            Object.keys(cart).forEach((key: string) => {
                if(menu[key]) {
                    cartTotal = cartTotal + cart[key] * menu[key].getPrice();
                }
            })

            setTotal(cartTotal);
        }

        method();

    }, [cart]);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{width: '100%'}}>
                <ShopInfo
                    name={shopInfo.name}
                    locality={shopInfo.locality}
                    type={shopInfo.typesList}
                />

                {
                    categories?.map((data: SingleCategoryProp, idx: number) => {
                        return (
                            <Categories
                                key={idx}
                                info={data}
                                shopId={shopInfo.shopId}
                                cart={cart}
                                updateCart={updateCart}
                            />
                        )
                    })
                }

                <View style={styles.footer}>

                </View>
            </ScrollView>
            {
                total > 0 ?
                    <ShowTotal
                        total={total}
                        destination='Basket'
                    />
                    :
                    null
            }
        </View>
    )
}

export default ShopScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        minHeight: 50,
    }
})
