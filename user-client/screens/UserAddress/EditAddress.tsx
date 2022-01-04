import { AntDesign, FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import * as React from 'react'
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import client from "../../utils/grpcClient";
import serverpb from "../../proto/server_pb";

const EditAddress = (props: any) => {

    const [info, setInfo] = React.useState(props.info);
    console.log(info);

    React.useEffect(() => {
        setInfo(props.info);
    }, [props.info]);

    const _renderModalHeader = () => {
        return (
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                    }}
                >
                    {
                        props.createNew ? 
                            "Add New Address"
                            :
                            "Edit Address"
                    }
                </Text>

                <TouchableOpacity onPress={() => props.toggleVisible()}>
                    <AntDesign
                        name='closecircleo'
                        color={'black'}
                        size={20}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    const _renderMap = () => {
        return (
            <View>
                <Text>map component</Text>
            </View>
        )
    }

    const _renderForm = () => {
        return (
            <View>
                <Text>House address/Flat number*</Text>
                <TextInput
                    value={info.houseAddress}
                    style={styles.inputField}
                    onChangeText={text => setInfo({...info, 'houseAddress': text})}
                />

                <Text>Locality*</Text>
                <TextInput
                    value={info.area}
                    style={styles.inputField}
                    onChangeText={text => setInfo({...info, 'area': text})}
                />

                <Text>Landmark (optional)</Text>
                <TextInput
                    value={info.landmark}
                    style={styles.inputField}
                    onChangeText={text => setInfo({...info, 'landmark': text})}
                />

                <Text>Save as:</Text>
                <View style={{
                    display: 'flex', flexDirection: 'row', justifyContent: 'center',
                }}>
                    <TouchableOpacity
                        style={[styles.savedAsOption, info.savedAs === "Home" && styles.savedAsSelected]}
                        onPress={() => setInfo({...info, savedAs: 'Home'})}
                    >
                        <FontAwesome name="home" size={24} color="black" />
                        <Text>Home</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.savedAsOption, info.savedAs === "Work" && styles.savedAsSelected]}
                        onPress={() => setInfo({...info, savedAs: 'Work'})}
                    >
                        <MaterialCommunityIcons name="office-building" size={24} color="black" />
                        <Text>Work</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.savedAsOption, info.savedAs === "Other" && styles.savedAsSelected]}
                        onPress={() => setInfo({...info, savedAs: 'Other'})}
                    >
                        <MaterialIcons name="place" size={24} color="black" />
                        <Text>Other</Text>
                    </TouchableOpacity>
                </View>

                {
                    info.savedAs === "Other" ? 
                        <View>
                            <TextInput 
                                value={info.otherName}
                                style={styles.inputField}
                                onChangeText={text => setInfo({...info, 'otherName': text})}
                            />
                        </View>
                        :
                        null
                }
            </View>
        )
    }

    const _renderButton = () => {

        const submitButtonHandler = () => {
            if(
                !info.houseAddress.trim().length ||
                !info.area.trim().length ||
                !info.savedAs ||
                (info.savedAs === "Other" && !info.otherName.trim().length)
            ) {
                return alert("Fill the required fields first!");
            }

            const newAddress = new serverpb.Address();
            newAddress.setArea(info.area);
            newAddress.setHouseaddress(info.houseAddress);
            newAddress.setLandmark(info.landmark);
            newAddress.setSavedas(info.savedAs);
            newAddress.setOthername(info.otherName);
            newAddress.setUserid(info.userId);

            const reqParam = new serverpb.AddNewAddressRequest();
            reqParam.setAddress(newAddress);

            client.addNewAddress(reqParam, null, (err: Error, resp: serverpb.AddNewAddressResponse) => {
                if (err) {
                    console.error("Some error occurred: ", err)
                    return alert(err.message);
                }

                const respAdd = resp.getAddress();
                newAddress.setId(respAdd?.getId() || "");

                props.setAddresses((prev: serverpb.Address[]) => {
                    return [
                        ...prev,
                        newAddress,
                    ]
                })

                return props.toggleVisible();
            });
        }

        return (
            <TouchableOpacity
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '30%',
                    borderRadius: 8,
                    backgroundColor: 'green',
                }}
                onPress={submitButtonHandler}
            >
                <Text style={{
                    color: 'white',
                    fontWeight: 'bold',
                }}>
                    Save
                </Text>
            </TouchableOpacity>
        )
    }

    const _renderModalContent = () => {
        return (
            <View style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '80%',
                marginHorizontal: 20,
                marginTop: 40,
            }}>
                <View style={{
                    backgroundColor: 'white',
                    borderRadius: 15,
                    height: '100%',
                    padding: 20,
                }}>
                    { _renderModalHeader() }
                    { _renderMap() }
                    { _renderForm() }
                    { _renderButton() }
                </View>
            </View>
        )
    }

    return (
        <View style={styles.centeredView}>
            <Modal
                visible={props.visible}
                animationType='fade'
                transparent={true}
                onRequestClose={props.toggleVisible}
                style={{
                    justifyContent: 'center',
                    display: 'flex',
                }}
            >
                <TouchableWithoutFeedback onPress={props.toggleVisible}>
                    <View style={styles.modalOverlay} />
                </TouchableWithoutFeedback>

                { _renderModalContent() }
            </Modal>
        </View>
    )
}

export default EditAddress

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    inputField: {
        borderWidth: 1,
        borderColor: 'gray',
        // color: 'green',
        fontWeight: 'bold',
        borderRadius: 5,
        paddingHorizontal: 4,
        paddingVertical: 6,
    },
    savedAsOption: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
        backgroundColor: 'white',
    },
    savedAsSelected: {
        backgroundColor: 'lightgreen',
    }
})
