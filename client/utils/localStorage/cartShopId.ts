import { useAsyncStorage } from "@react-native-async-storage/async-storage";

const { getItem, setItem } = useAsyncStorage('cart-shop-id');

export const getCartShopIdLocal = async () => {
    try {
        const shopId = await getItem();
        if(!shopId)
            return "";

        return shopId
    } catch (err) {
        console.log(err);
        return "";
    }
}

export const setCartShopIdLocal = async (shopId: string) => {
    try {
        await setItem(shopId);
    } catch (err) {
        console.log(err);
    }
}