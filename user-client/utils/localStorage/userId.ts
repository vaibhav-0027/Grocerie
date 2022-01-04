import { useAsyncStorage } from "@react-native-async-storage/async-storage";

const { getItem, setItem } = useAsyncStorage('user-id');

export const getUserIdLocal = async () => {
    try {
        const userId = await getItem();
        if (!userId) {
            return "";
        }

        return userId;
    } catch (error) {
        console.log(error)
        return "";
    }
}

export const setUserIdLocal = async (userId: string) => {
    try {
        await setItem(userId);
    } catch (error) {
        console.log(error);
    }
}