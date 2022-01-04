import { AntDesign } from '@expo/vector-icons'
import * as React from 'react'
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'

const EditAddress = (props: any) => {

    const [info, setInfo] = React.useState(props.info);

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
            </View>
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
    }
})
