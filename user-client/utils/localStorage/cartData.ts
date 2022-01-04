import { useAsyncStorage } from "@react-native-async-storage/async-storage";

const { getItem, setItem } = useAsyncStorage('cart-data');

export const clearCartDataLocal = async () => {
    try {
        await setItem("[]");
    } catch (err) {
        console.log(err);
    }
}

export const getCartDataLocal = async () => {
    try {
        const cartData = await getItem();
        if(!cartData)
            return "";

        return cartData;
    } catch (err) {
        console.log(err);
        return "";
    }
}

export const setCartDataLocal = async (cartData: string) => {
    try {
        // console.log(cartData)
        await setItem(cartData);
    } catch (err) {
        console.log(err);
    }
}