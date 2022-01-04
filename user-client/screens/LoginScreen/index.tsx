// import { useNavigation } from '@react-navigation/native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../../utils/firebase';

const LoginScreen = () => {

    const [mobile, setMobile] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(auth.getAuth(), user => {
            if(user) {
                navigation.dispatch(
                    CommonActions.navigate({
                        name: 'Landing'
                    })
                );
            }
        })

        unsubscribe();
    }, []);

    const loginHandler = () => {

        /**
         * TODO: Handle user does not exist
         * TODO: Handle wrong password
         * TODO: Handle invalid email
         * TODO: All fields should be filled
         */

        auth
            .signInWithEmailAndPassword(auth.getAuth(), mobile, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log("Logged in with: " + user.email);

                navigation.dispatch(
                    CommonActions.navigate({
                        name: 'Landing'
                    })
                );
            })
            .catch(error => {
                const errorStr = JSON.stringify(error);

                if(errorStr.includes("user-not-found")) {
                    return alert("User not found! Signup first!");
                } else if(errorStr.includes("wrong-password")) {
                    return alert("Invalid password!");
                } else {
                    return alert("Invalid user!");
                }
            });
    }

    const registerClickHandler = () => {
        navigation.dispatch(
            CommonActions.navigate({
                name: 'Register'
            })
        );
    }

    return (
        <View
            style={styles.container}
            // behavior='padding'
        >
            <View>
                <Text style={styles.header}>Login</Text>
            </View>
            <View
                style={styles.inputContainer}
            >
                <TextInput 
                    placeholder="Email Address"
                    value={mobile}
                    onChangeText={text => setMobile(text)}
                    style={styles.input}
                    // keyboardType='numeric'
                />

                <TextInput 
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={loginHandler}
                    style={[styles.button]}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={registerClickHandler}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>New User? Register here</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },
    header: {
        marginTop: -100,
        marginBottom: 100,
        fontSize: 50,
        fontWeight: '700',
    }
})
