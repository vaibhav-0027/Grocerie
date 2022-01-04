import { AntDesign } from '@expo/vector-icons'
import * as React from 'react'
import { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { myAddressesDummy } from '../../utils/dummyData';
import { getUserIdLocal } from '../../utils/localStorage/userId';
import EditAddress from './EditAddress';
import SingleAddress from './SingleAddress';
import client from "../../utils/grpcClient";
import serverpb from "../../proto/server_pb";

let initInfo = {
    houseAddress: '',
    area: '',
    landmark: '',
    id: '',
    savedAs: '',
    otherName: '',
    userId: '',
};

const UserAddresses = () => {

    const [showModal, setShowModal] = useState(false);
    const [addresses, setAddresses] = useState<serverpb.Address[]>([]);
    const [currentInfo, setCurrentInfo] = useState<any>(initInfo);

    console.log(addresses);
    
    const fetchUserAddresses = (userId: string) => {
        const reqParam = new serverpb.GetUserAddressRequest();
        reqParam.setUserid(userId);
        
        client.getUserAddress(reqParam, null, (err: Error, resp: serverpb.GetUserAddressResponse) => {
            if(err) {
                console.error("Something went wrong!", err);
                alert(err.message);
            }

            setAddresses(resp.getAddressList());
        });
    }

    useEffect(() => {
        getUserIdLocal().then((val: string) => {
            initInfo.userId = val;
            setCurrentInfo(initInfo);
            fetchUserAddresses(val);
        });
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
                addresses.map((_info: serverpb.Address, idx: number) => {
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
                setAddresses={setAddresses}
            />
        </ScrollView>
    )
}

export default UserAddresses

const styles = StyleSheet.create({})
