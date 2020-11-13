import React, { Component } from 'react'
import { Text, Button, View, TextInput, Image, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native'
import firebase from '../database/Firebase'

class SignUp extends Component {

    state = {
        email: '',
        password: '',
        name: '',
        confirmPassword: ''
    }

    updateValInput = (val, prop) => {
        const state = this.state
        state[prop] = val
        this.setState(state)
    }

    registerUser = () => {
        if (this.state.email === '' || this.state.password === '') {
            Alert.alert('Enter the details to signup!')
        }
        else if (this.state.password !== this.state.confirmPassword) {
            Alert.alert('Passwords dont match')
        }
        else {
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => {

                    console.log("User registered")
                    this.setState(() => ({
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    }))
                    this.props.navigation.navigate('Login')
                })
                .catch(error => this.setState({ errorMessage: error.message }))
            //console.log("hello")
        }
    }
    render() {
        var { navigate } = this.props.navigation
        return (
            <KeyboardAvoidingView style={{ backgroundColor: '#e74c3c', height: '100%' }}>
                <Image source={require('../COMPASSCHAT.jpg')} style={{ width: '100%', height: '30%' }} />
                <View style={styles.inputName}>
                    <TextInput placeholder="Enter Name" style={styles.input}
                        value={this.state.name}
                        onChangeText={(val) => this.updateValInput(val, 'name')}></TextInput>
                </View>
                <View style={styles.inputEmail}>
                    <TextInput placeholder="Enter email id" style={styles.input}
                        value={this.state.email}
                        onChangeText={(val) => this.updateValInput(val, 'email')}></TextInput>
                </View>
                <View style={styles.inputPassword}>
                    <TextInput placeholder="Enter password" style={styles.input}
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={(val) => this.updateValInput(val, 'password')}></TextInput>
                </View>

                <View style={styles.inputPassword}>
                    <TextInput placeholder="Confirm password" style={styles.input}
                        secureTextEntry={true}
                        value={this.state.confirmPassword}
                        onChangeText={(val) => this.updateValInput(val, 'confirmPassword')}></TextInput>
                </View>
                <View style={styles.btnContainer}>
                    <Button style={styles.btn} onPress={() => this.registerUser()}
                        title="Register" />
                </View>
                <View style={styles.btnContainer}>
                    <Button style={styles.btn} onPress={() => navigate("Login")}
                        title="Get Back to Login" />
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    logo: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    input: {
        alignItems: "center",
        fontWeight: 'bold'
    },
    inputEmail: {
        flexDirection: 'row',
        alignItems: "center",
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 20,
        backgroundColor: "white",
        marginTop: 15,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        paddingVertical: 2
    },
    inputName: {
        flexDirection: 'row',
        alignItems: "center",
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 20,
        backgroundColor: "white",
        marginTop: 70,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        paddingVertical: 2

    },
    inputPassword: {
        flexDirection: 'row',
        alignItems: "center",
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 20,
        backgroundColor: "white",
        marginTop: 15,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        paddingVertical: 2

    },
    btn: {
        flexDirection: "row",

    },
    btnContainer: {
        marginHorizontal: 90,
        justifyContent: 'center',
        paddingVertical: 2,
        marginTop: 25
    }
})
export default SignUp