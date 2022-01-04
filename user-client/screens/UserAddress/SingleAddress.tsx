import { Entypo } from '@expo/vector-icons';
import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import serverpb from "../../proto/server_pb";

type SingleAddressProps = {
    info: serverpb.Address;
    showModal: () => void;
    setCurrentInfo: (props: any) => void;
}

const SingleAddress = (props: SingleAddressProps) => {

    const { info } = props;

    const savedAs = info.getSavedas();
    const houseAddress = info.getHouseaddress();
    const area = info.getArea();
    const otherName = info.getOthername();

    const iconName = (() => {
        if(savedAs === 'Home') {
            return 'home'
        } else if(savedAs === 'Work') {
            return 'briefcase'
        } else {
            return 'location-pin'
        }
    })();
    
    const editButtonPressHandler = () => {
        props.setCurrentInfo({
            houseAddress,
            area,
            landmark: info.getLandmark(),
            id: info.getId(),
            savedAs,
            otherName,
            userId: info.getUserid(),
        });
        return props.showModal();
    }
    
    const _renderAddressInfo = () => {
        return (
            <View style={{
                width: '90%',
                marginLeft: 4,
            }}>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                }}>
                    { savedAs === 'Other' ? otherName : savedAs }
                </Text>

                <Text numberOfLines={1}>
                    { houseAddress }
                </Text>

                <Text numberOfLines={1}>
                    { area }
                </Text>
            </View>
        )
    }
    
    return (
        <View style={styles.container}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '80%',
            }}>
                <Entypo 
                    name={iconName}
                    size={30}
                    color='black'    
                />
                { _renderAddressInfo() }
            </View>

            <View style={{
                width: '20%',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <TouchableOpacity
                    onPress={editButtonPressHandler}
                >
                    <Text>
                        Edit
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SingleAddress

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        marginVertical: 4, 
        marginHorizontal: 8,
        padding: 8,
        minHeight: 60,
        borderRadius: 10,
    }
})
