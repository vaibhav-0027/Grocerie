import { AntDesign } from '@expo/vector-icons'
import * as React from 'react'
import { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { myAddressesDummy } from '../../utils/dummyData';
import EditAddress from './EditAddress';
import SingleAddress from './SingleAddress';

const initInfo = {
    houseAddress: '',
    area: '',
    landmark: '',
    id: '',
};

const UserAddresses = () => {

    const [showModal, setShowModal] = useState(false);
    const [addresses, setAddresses] = useState<any>([]);
    const [currentInfo, setCurrentInfo] = useState<any>(initInfo);
    console.log(currentInfo);

    useEffect(() => {
        setAddresses(myAddressesDummy);
    }, []);

    const toggleShowModal = () => {
        setShowModal(!showModal);
    }

    const addNewAddressHandler = () => {
        setCurrentInfo(initInfo);
        return toggleShowModal();
    }

    const _renderAddNewAddress = () => {
        return (
            <TouchableOpacity 
                onPress={addNewAddressHandler}
                style={{
                    display: 'flex', 
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    marginVertical: 4,
                    marginHorizontal: 8,
                    borderRadius: 10,
                    paddingVertical: 8,
                    paddingHorizontal: 8,
                }}
            >
                <AntDesign 
                    name='plussquare'
                    size={20}
                    color='black'
                    style={{
                        marginRight: 6,
                    }}
                />
                
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                    }}
                >
                    Add New Address
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <ScrollView>
            { _renderAddNewAddress() }

            { 
                addresses.map((_info: any, idx: number) => {
                    return (
                        <SingleAddress
                            info={_info}
                            key={idx}
                            showModal={toggleShowModal}
                            setCurrentInfo={setCurrentInfo}
                        />
                    )
                })
            }

            <EditAddress 
                visible={showModal}
                toggleVisible={toggleShowModal}
                createNew={currentInfo.id === ''}
                info={currentInfo}
            />
        </ScrollView>
    )
}

export default UserAddresses

const styles = StyleSheet.create({})
