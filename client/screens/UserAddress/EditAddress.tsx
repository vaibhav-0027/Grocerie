import { AntDesign } from '@expo/vector-icons'
import * as React from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'

const EditAddress = (props: any) => {

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

    const _renderForm = () => {
        return (
            <Text>
                Form comes here!
            </Text>
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
})
