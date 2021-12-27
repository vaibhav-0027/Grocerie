import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native'
import { auth } from '../../utils/firebase';

const SignupScreen = () => {

    const [name, setName] = useState<string>('');
    const [mobile, setMobile] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(auth.getAuth(), user => {
            if(user) {
                navigation.dispatch(
                    CommonActions.navigate({
                        name: 'Home'
                    })
                );
            }
        })

        unsubscribe();
    }, []);

    const registerHandler = () => {

        /**
         * TODO: check if email is valid
         * TODO: check if user already exists
         * TODO: check name validity
         * TODO: all fields should be filled
         */

        if (password.length < 6) {
            return alert('Password too short!');
        }

        if (password !== repeatPassword) {
            return alert('Passwords do not match!');
        }

        auth.
            createUserWithEmailAndPassword(auth.getAuth(), mobile, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log("Created account for: " + user.email);

                /**
                 * TODO: save user in postgres database
                 */

                navigation.dispatch(
                    CommonActions.navigate({
                        name: 'Home'
                    })
                );
            })
            .catch(error => alert(error.message));
    }

    const loginClickHandler = () => {
        navigation.dispatch(
            CommonActions.navigate({
                name: 'Login'
            })
        );
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.header}>Register</Text>
            </View>
            <View
                style={styles.inputContainer}
            >
                <TextInput 
                    placeholder="Name"
                    value={name}
                    onChangeText={text => setName(text)}
                    style={styles.input}
                />
                
                <TextInput 
                    placeholder="Email Address"
                    value={mobile}
                    onChangeText={text => setMobile(text)}
                    style={styles.input}
                />

                <TextInput 
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />

                <TextInput 
                    placeholder="Repeat Password"
                    value={repeatPassword}
                    onChangeText={text => setRepeatPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={registerHandler}
                    style={[styles.button]}
                >
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={loginClickHandler}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Back to Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignupScreen

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
