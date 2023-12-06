import React,{useState} from 'react';
import { View, Text, StyleSheet,TextInput,Button,Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignupScreen({navigation}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
   
    const handleSignUp = () => {
        axios.post('http://localhost:8080/addUser', {
            username: username,
            password: password,
            email: email,
        })
        .then(async function (response) {
            console.log('Navigation: ', navigation); 
            navigation.navigate('SignIn');
            
        })
        .catch(function (error) {
            if (error.response && error.response.status === 400) {
                console.log("Username already exists");
                Alert.alert("Username already exists");
            } else {
                console.log("There was an error: ", error);
            }
        });
    
      };
    return (
        <View style= {styles.whole}>
           
            <View style ={styles.buttons}>
            <TextInput style={styles.input} placeholder="username"  onChangeText = {text => setUsername(text)}/>
            <TextInput style={styles.input} placeholder="password" onChangeText = {text => setPassword(text)} />
            <TextInput style={styles.input}  placeholder="email" onChangeText = {text => setEmail(text)}/>
            <Button title="Sign up" onPress={ handleSignUp} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    whole: {
        flex: 1,
        justifyContent:'center',
        alignContent: 'center',
      },
    buttons: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        
      },
    input: {
        height: 40,
        margin: 20,
        borderWidth: 2,
        width: 200,
      },
  });