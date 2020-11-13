import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import firebase from '../database/Firebase'
import AsyncStorage from '@react-native-community/async-storage'


class Home extends Component {

    state = {
        messages: [],
        user: 'true',
        userData: null
    }

    componentDidMount() {
        const db = firebase.firestore()
        const chatsRef = db.collection('chats')
        this.readUser()
        const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {

            const messagesFirestore = querySnapshot
                .docChanges()
                .filter(({ type }) => type === 'added')
                .map(({ doc }) => {
                    const message = doc.data()
                    return { ...message, createdAt: message.createdAt.toDate() }
                })
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            this.appendMessages(messagesFirestore)
        })
        return () => unsubscribe()
    }

    handleSend(messages) {
        const writes = messages.map((m) => chatsRef.add(m))
        Promise.all(writes)
    }

    appendMessages = (messages) => {

        this.setState((previousMessages) => GiftedChat.append(previousMessages, messages))
    }
    async readUser() {
        const userData = await AsyncStorage.getItem('userData')
        if (userData) {
            setUser(JSON.parse(userData))
        }
    }
    async handlePress() {
        const _id = Math.random().toString(36).substring(7)
        const userData = { _id, name }
        await AsyncStorage.setItem('userData', JSON.stringify(userData))
    }

    handleLogout = () => {
        this.setState(() => ({
            user: false
        }))
    }
    render() {
        if (this.state.user === 'true') {

            return (<View>
                <Button title="logout" style={{ width: 200 }} onPress={() => this.handleLogout()}></Button>
                <GiftedChat messages={this.state.messages} user={this.state.userData}
                    onSend={() => this.handleSend()} />
            </View>)
        } else {
            return (<View>
                {this.props.navigation.navigate("Login")}
            </View>)

        }
    }
}

export default Home