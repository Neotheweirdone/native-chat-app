import React, { Component } from 'react'
import { Text, Button, View, TextInput, Image, StyleSheet, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Fontisto'
import firebase from '../database/Firebase'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';


class Login extends Component {

    state = {
        email: '',
        password: ''
    }

    componentDidMount() {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
            webClientId: '274787509223-ufn8nd4j3gn3icfra098ul7i15414ore.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            //hostedDomain: '', // specifies a hosted domain restriction
            //loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
            forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
            //accountName: '', // [Android] specifies an account name on the device that should be used
            //iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
        });

    }
    updateValInput = (val, prop) => {
        const state = this.state
        state[prop] = val
        this.setState(state)
    }

    userLogin = () => {
        if (this.state.email === '' || this.state.password === '') {
            Alert.alert('Enter details to signin')
        } else {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => {
                    this.setState({
                        email: '',
                        password: ''
                    })
                    this.props.navigation.navigate('Home')
                })
                .catch(error => this.setState({ errorMessage: error.message }))
        }
    }

    signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            //this.setState({ userInfo });
            console.log({ userInfo })
        } catch (error) {
            console.log({ error })
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

    render() {
        var { navigate } = this.props.navigation
        return (
            <View style={{ backgroundColor: '#e74c3c', height: '100%' }}>
                <Image source={require('../COMPASSCHAT.jpg')} style={{ width: '100%', height: '30%' }} />
                <View style={styles.inputEmail}>
                    <Icon name='email' size={30} color={'#4b6584'} style={styles.logo} />
                    <TextInput placeholder="Enter email id" style={styles.input}
                        value={this.state.email} onChangeText={(val) => this.updateValInput(val, 'email')}></TextInput>
                </View>
                <View style={styles.inputPassword}>
                    <Icon name="key" size={30} color={'#4b6584'} style={styles.logo} />
                    <TextInput placeholder="Enter password" style={styles.input}
                        secureTextEntry={true} value={this.state.password}
                        onChangeText={(val) => this.updateValInput(val, "password")}></TextInput>
                </View>
                <View style={styles.btnContainer}>
                    <Button onPress={() => this.userLogin()} style={styles.btn}
                        title="Login" />
                </View>
                <View style={styles.btnContainer}>
                    <Button onPress={() => navigate('SignUp')} style={styles.btn}
                        title="Sign Up" />
                </View>
                <View>
                    <GoogleSigninButton
                        style={{ width: 192, height: 48, marginHorizontal: 110, marginTop: 20 }}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={() => this.signIn()} />
                </View>
            </View>
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
        marginTop: 25,
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
export default Login