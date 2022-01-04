import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { shopInfo } from '../../utils/dummyData';
import { clearCartDataLocal, getCartDataLocal, setCartDataLocal } from '../../utils/localStorage/cartData';
import { getCartShopIdLocal, setCartShopIdLocal } from '../../utils/localStorage/cartShopId';
import Categories from './Categories';
import ShopInfo from '../../components/ShopInfo';
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

const ShopScreen = (props: any) => {

    const [shopId] = useState(props.route.params.shopId);
    const [info, setInfo] = useState<InfoProps | null>(null);
    const [categories, setCategories] = useState<any[]>();
    const [cart, setCart] = useState<any>({});
    const [firstLoad, setFirstLoad] = useState(true);
    const [total, setTotal] = useState(10);
    const [menu, setMenu] = useState<any>();

    const updateCart = (itemId: string, newCount: number) => {
        setCart((prev: any) => {
            return {
                ...prev,
                [itemId]: newCount,
            }
        });
    }

    // Setting shopInfo on page load to send to <ShopInfo /> component
    useEffect(() => {
        setInfo(shopInfo);
    }, []);

    // check if already stored info is same as this shop info
    useEffect(() => {

        if(!info)
            return;

        const method = async () => {
            const cartShopId = await getCartShopIdLocal();

            let tempCart: any = {};
            let newData: any = {bestseller: []};
            let tempMenu: any = {};

            info?.menu.forEach((data) => {
                tempCart = {
                    ...tempCart,
                    [data.id]: 0,
                }

                tempMenu = {
                    ...tempMenu,
                    [data.id]: data,
                }

                if(data.bestSeller) {
                    newData = {
                        ...newData,
                        bestseller: [
                            ...newData['bestseller'],
                            data,
                        ]
                    }
                }

                if(!newData[data.category]) {
                    newData = {
                        ...newData,
                        [data.category]: [data],
                    };
                } else {
                    newData = {
                        ...newData,
                        [data.category]: [
                            ...newData[data.category],
                            data
                        ]
                    };
                }
            })

            let arr: any[] = [];

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


            if(cartShopId === shopId) {
                let cartDataString = await getCartDataLocal();
                let cartData = JSON.parse(cartDataString);

                // console.log(tempCart);
                // console.log(cartData);

                setCart({
                    ...tempCart,
                    ...cartData,
                });

            } else {
                setCart(tempCart);
            }
        }

        method();
    }, [info]);

    // updating local cartData on any change in selected items
    useEffect(() => {
        if(firstLoad) {
            return setFirstLoad(false);
        }
        // console.log("updating cart");

        const method = async () => {
            const cartShopId = await getCartShopIdLocal();
            // console.log(cartShopId);

            if(cartShopId !== shopId) {
                // TODO: ask if clear cart?
                // console.log("clearing cart");
                await clearCartDataLocal();
                await setCartShopIdLocal(shopId);
            } 

            await setCartDataLocal(JSON.stringify(cart));

            let cartTotal = 0;
            Object.keys(cart).forEach((key: string) => {
                if(menu) {
                    cartTotal = cartTotal + cart[key] * menu[key].price;
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
                    name={info?.name || 'Temp'}
                    locality={info?.locality || 'somewhere'}
                    type={info?.type || ['chinese', 'mexican']}
                />

                {
                    categories?.map((data, idx: number) => {
                        return (
                            <Categories
                                key={idx}
                                info={data}
                                shopId={shopId}
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
