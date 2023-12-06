import React,{useState} from 'react';
import { View, Text, StyleSheet,TextInput,Button,Alert,CanvasGradient} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageBackground } from 'react-native';
import { StatusBar } from 'react-native';

//load image that i want to use as the sign in screens background
const backgroundImage = require('/Users/oasis/Documents/caloiretrack/assets/GengarphoneBackground.png'); 

export default function SignIn({navigation}) {

    const [userName,setUsername] = useState('');
    const[ password, setPassword]= useState ('');

   
    const handleSignIn = () => {
        // Here is where the api call to the server is to check ones CredentialsContainer.For the user to
        // be able to sign in there must be an existence of the username and password exact combination in
        // the database.
        axios.post('http://localhost:8080/checkCred', {
            username: userName,
            password: password
        })  
        .then(async function (response) {
            console.log(response.data);
           
            try {
                await AsyncStorage.setItem('@jwt', response.data.token);
                navigation.navigate('Home');
            } catch (e) {
                console.error("Error saving token to storage: ", e);
            }
            
        })
        .catch(function (error) {
            if (error.response && error.response.status === 400) {
                Alert.alert("Incorrect Username or Password");
            } else {
                console.log("There was an error IN SIGN IN: ", error);
            }
        });
    
    }
    return (
      
   
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View >
            <View style ={styles.buttons}>
            <TextInput style={styles.input} placeholder="username" onChangeText = {text => setUsername(text)} />
            <TextInput style={styles.input} secureTextEntry placeholder="password" onChangeText = {text => setPassword(text)} />
            <Button title="Sign in" onPress={handleSignIn} />
            <Button title="Sign up" onPress={() => navigation.navigate('Signup')}  />    
            </View>
        </View>
        </ImageBackground>
       
      
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
        backgroundColor: 'white',
        
      },
      backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      }
  });
