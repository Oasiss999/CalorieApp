import react from 'react';
import { View, Text,Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode as atob } from 'base-64';
import { useFocusEffect } from '@react-navigation/native';

//decode the jwt token to get the user id
function decodeJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
  };

export default function DeleteAccount({navigation}) {

    const handleDeletion = async () => {
        const jwtToken = await AsyncStorage.getItem('@jwt');
        const decoded = decodeJwt(jwtToken);
        const id = decoded.id;

        axios.delete('http://localhost:8080/deleteUser', {
            params: {
                user_id: id,
            }
        })
            .then(function (response) { 
                console.log(response);
                navigation.navigate('SignIn');
            })
            .catch(function (error) {
                console.log("There was an error: " ,error);
            });
            
      };

    return (
        <View>
            <Text>Would you like to delete your acount?</Text>
            <Text> Why would you leave me :(</Text>
            <Button title="Delete Account" onPress={handleDeletion} />
        </View>
    )
}
