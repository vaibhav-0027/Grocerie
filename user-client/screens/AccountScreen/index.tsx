import { Entypo, FontAwesome, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'
import { CommonActions, useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../../utils/firebase'
import client from "../../utils/grpcClient";
import serverpb from "../../proto/server_pb";
import { setUserIdLocal } from '../../utils/localStorage/userId'

const AccountScreen = () => {

    const [userDetails, setUserDetails] = useState<any>();
    const [editingName, setEditingName] = useState<boolean>(false);
    const navigation = useNavigation();

    useEffect(() => {
        const currentAuth = auth.getAuth();

        auth.onAuthStateChanged(currentAuth, (user) => {
            if (user) {
                const param = new serverpb.GetUserDetailsRequest();
                param.setFirebaseId(user.uid);

                client.getUserDetails(param, {}, async (err: Error, resp: serverpb.GetUserDetailsResponse) => {
                    if (err) {
                        console.log("Some error occured", err, resp);
                        return alert(err.message);
                    }

                    await setUserIdLocal(resp.getId());
        
                    setUserDetails({
                        name: resp.getName(),
                        mobile: resp.getMobile(),
                        uid: resp.getId(),
                    });
                })
            } else {
                letsNavigate("Login");
            }
        });

    }, []);

    const letsNavigate = (location: string) => {
        navigation.dispatch(
            CommonActions.navigate({
                name: location,
                params: {
                    info: userDetails,
                }
            })
        );
    }

    const editUserButtonHandler = () => {
        setEditingName(true);
    }

    const redirectToUserAddresses = () => {
        letsNavigate("UserAddresses");
    }

    const redirectToUserOrders = () => {
        letsNavigate("UserPreviousOrders");
    }

    const logoutHandler = () => {
        auth
            .signOut(auth.getAuth())
            .then(() => {
                letsNavigate("Login");
            })
            .catch(error => { 
                console.log("here in the catch block");
                alert(error.mesage)
            });
    }

    const saveNameHandler = () => {

        if(userDetails.name.trim().length === 0) {
            return alert("Name cannot be empty!");
        }

        const updatedUser = new serverpb.UpdateUserDetailsRequest();
        updatedUser.setId(userDetails.id);
        updatedUser.setName(userDetails.name);

        client.updateUserDetails(updatedUser, {}, (err: Error, resp: serverpb.UpdateUserDetailsResponse) => {

            if(err) {
                console.error("Some error occurred: ", err);
                return alert(err.message);
            }

            const status = resp.getStatus();
            if(status !== "OK") {
                return alert("Something went wrong!!")
            }

            setEditingName(false);
        });

    }

    const _renderUserDetails = () => {
        return (
            <View style={styles.userDetailsContainer}>
                <View style={styles.userInfoContainer}>
                    <Text style={styles.userNameText}>
                        { userDetails?.name }
                    </Text>
                    <Text style={styles.userMobileText}>
                        { userDetails?.mobile }
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.editButtonContainer}
                    onPress={editUserButtonHandler}
                >
                    <FontAwesome name="pencil" size={14} color="black" />
                    <Text style={styles.editButton}>
                        Edit
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    const _renderEditUserDetails = () => {
        return (
            <View style={[styles.userDetailsContainer, styles.editUserDetailsContainer]}>
                <TextInput 
                    style={styles.editUserNameInput}
                    value={userDetails?.name}
                    placeholder='Enter Your Name'
                    onChangeText={text => setUserDetails({...userDetails, name: text})}
                />

                <TouchableOpacity style={styles.saveContainer}>
                    <Text onPress={saveNameHandler} style={styles.saveText}>
                        Save
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    const _renderUserAddresses = () => {
        return (
            <TouchableOpacity
                style={styles.userAddressesContainer}
                onPress={redirectToUserAddresses}
            >
                <View style={styles.addressContainer}>
                    <Entypo name="address" size={24} color="black" />
                    <Text style={styles.addressText}>
                        Manage My Addresses
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    const _renderUserOrders = () => {
        return (
            <TouchableOpacity 
                style={styles.userOrdersContainer}
                onPress={redirectToUserOrders}    
            >
                <View style={styles.previousOrdersContainer}>
                    <SimpleLineIcons name="basket-loaded" size={24} color="black" />
                    <Text style={styles.previousOrdersText}>
                        View Previous Orders
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    const _renderLogoutButton = () => {
        return (
            <TouchableOpacity 
                style={styles.logoutButtonContainer}
                onPress={logoutHandler}
            >
                <MaterialIcons name="logout" size={24} color="black" />
                <Text style={styles.logoutText}>
                    Logout
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            { 
                editingName ? 
                    _renderEditUserDetails()
                    :
                    _renderUserDetails()
            }

            { _renderUserAddresses() }

            { _renderUserOrders() }

            { _renderLogoutButton() }
        </View>
    )
}

export default AccountScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    userDetailsContainer: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        minHeight: 50,
        margin: 4,
        borderRadius: 10,
    },
    userInfoContainer: {
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 10,
    },
    userNameText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    userMobileText: {
        fontStyle: 'italic',
        fontSize: 12,
        color: 'gray',
    },
    editButtonContainer: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
    editButton: {
        marginLeft: 4,
        fontSize: 14,
        fontWeight: 'bold',
    },
    userAddressesContainer: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        minHeight: 50,
        margin: 4,
        borderRadius: 10,
    },
    addressContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        alignItems: 'center',
        paddingLeft: 10,
    },
    addressText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 6,
    },
    userOrdersContainer: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        minHeight: 50,
        margin: 4,
        borderRadius: 10,
    },
    previousOrdersContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        alignItems: 'center',
        paddingLeft: 10,
    },
    previousOrdersText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 6,
    },
    logoutButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        minHeight: 50,
        margin: 4,
        borderRadius: 10,
        alignItems: 'center',
        paddingLeft: 10,
    },
    logoutText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 6,
    },
    editUserDetailsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    editUserNameInput: {
        width: '80%',
        paddingLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    saveContainer: {
        backgroundColor: 'green',
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    saveText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
})
