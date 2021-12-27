import { Entypo } from '@expo/vector-icons';
import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type SingleAddressProps = {

}

const SingleAddress = (props: any) => {

    const { info } = props;

    const iconName = (() => {
        if(info.savedAs === 'Home') {
            return 'home'
        } else if(info.savedAs === 'Work') {
            return 'briefcase'
        } else {
            return 'location-pin'
        }
    })();
    
    const editButtonPressHandler = () => {
        props.setCurrentInfo(info);
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
                    { info.savedAs === 'Other' ? info.otherName : info.savedAs }
                </Text>

                <Text numberOfLines={1}>
                    { info.houseAddress }
                </Text>

                <Text numberOfLines={1}>
                    { info.area }
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
