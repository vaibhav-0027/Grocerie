import { AntDesign } from '@expo/vector-icons'
import { CommonActions, useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import { myAddressesDummy } from '../../utils/dummyData'

type AddressSelectorProps = {
    addressId: string;
    setAddressId: (newAddressId: string) => void;
}

const AddressSelector = (props: AddressSelectorProps) => {

    const [data, setData] = useState<any>([]);
    const navigation = useNavigation();

    useEffect(() => {
        setData([
            {id: 'newAddress'},
            ...myAddressesDummy,
        ]);
    }, []);

    const addNewAddressHandler = () => {
        navigation.dispatch(
            CommonActions.navigate({
                name: "UserAddresses",
                params: {
                    fromCart: true,
                }
            })
        );
    }

    return (
        <SelectDropdown
            data={data}
            defaultButtonText='Select delivery address'
            onSelect={(item) => {
                props.setAddressId(item.id);
            }}
            buttonTextAfterSelection={(selectedItem) => {
                if(selectedItem.savedAs === 'Other') {
                    return selectedItem.otherName;
                }

                return selectedItem.savedAs;
            }}
            rowTextForSelection={(item) => {
                if(item.id !== "newAddress")
                    return `${item.savedAs} - ${item.houseAddress}`;

                return "newAddress";
            }}
            renderCustomizedRowChild={(text) => {
                if(text === "newAddress") {
                    return (
                        <TouchableOpacity 
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginLeft: 6,
                            }}
                            onPress={addNewAddressHandler}
                        >
                            <AntDesign name="plussquare" size={16} color="black" />
                            <Text style={{fontSize: 16, marginLeft: 4,}}>Add new address</Text>
                        </TouchableOpacity>
                    )
                }

                return (
                    <View style={{marginLeft: 6,}}>
                        <Text>
                            {text}
                        </Text>
                    </View>
                )
            }}
            renderDropdownIcon={() => {
                return <AntDesign name="caretdown" size={16} color="black" />
            }}
            dropdownStyle={styles.dropdownStyle}
            buttonStyle={styles.buttonStyle}
            rowTextStyle={styles.rowTextStyle}
            buttonTextStyle={styles.buttonTextStyle}
        />
    )
}

export default AddressSelector

const styles = StyleSheet.create({
    dropdownStyle: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    rowStyle: {
        lineHeight: 18,
    },
    buttonStyle: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    rowTextStyle: {
        fontSize: 16,
        color: "black",
    },
    buttonTextStyle: {
        fontWeight: 'bold',
        fontSize: 16,
    },
})
