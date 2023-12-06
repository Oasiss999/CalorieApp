import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, Platform } from 'react-native';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode as atob } from 'base-64';

function decodeJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

export default function ChangeDailyGoal ({navigation}){
    
    const [calorieGoal, setGoal] = useState(0);
    const[type,setType] = useState('Daily');

    const handleAddDailyGoal= async () => {
        if(!calorieGoal){
            alert('Please Enter a Goal');
            return;
        }

        const jwtToken = await AsyncStorage.getItem('@jwt');
        //console.log('JWT from addMeal:', jwtToken);
        const decoded = decodeJwt(jwtToken);
       // console.log('made it');
        const id = decoded.id;

        axios.post('http://localhost:3000/changeDailyGoal', {
            user_id:id,
            daily_Goal:calorieGoal,
            type:type,
            
         })
             .then(function (response) {
                    console.log("Goal Added");
                 navigation.navigate('Home');
             })
             .catch(function (error) {
                 console.log("There was an error: " ,error);
             });
       };
    
    return(
        <View>
            <TextInput style={styles.input} placeholder="Goal" onChangeText={text => setGoal(text)}/>
            <TouchableOpacity style={styles.button} onPress={handleAddDailyGoal}> 
            <Text>Submit</Text>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
    });