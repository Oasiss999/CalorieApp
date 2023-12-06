import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, Platform } from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
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

export default function AddMealScreen({navigation}) {
   const [meal, setMeal] = useState('');
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [time, setTime] = useState('');
    const [calories, setCalories] = useState('');

  

    const handleAddMeal = async () => {
        if (!meal || !date || !time || !calories) {
            alert('Please fill out all Boxes');
            return;
        }
        
       
        const jwtToken = await AsyncStorage.getItem('@jwt');
        //console.log('JWT from addMeal:', jwtToken);
        const decoded = decodeJwt(jwtToken);
       // console.log('made it');
        const id = decoded.id;
        
        
        date.setHours(0, 0, 0, 0);
      

        axios.post('http://130.157.170.101:3000/addMeal', {
           user_id:id,
            meal: meal,
            date: date,
            time: time,
            calories: calories,
        })
            .then(function (response) {
                console.log(response);
                navigation.navigate('Home');
            })
            .catch(function (error) {
                console.log("There was an error in add meal: " ,error);
            });
      };

      const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showDatepicker = () => {
        setShow(true);
    };

    return (
        <View style= {styles.whole}>
            <TextInput style={styles.input} placeholder="meal" onChangeText={text => setMeal(text)}/>
            <TextInput style={styles.input}  placeholder="time" onChangeText={text => setTime(text)}/>
            <TextInput style={styles.input} placeholder="calories" onChangeText={text => setCalories(text)}/>
            <TouchableOpacity onPress={showDatepicker} style={styles.Date}>
    <Text style={styles.text}>Date</Text>
            </TouchableOpacity>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    display="default"
                    onChange={onChange}
                />
            )}
                <TouchableOpacity style={styles.buttons} onPress={handleAddMeal}>
                        <Text style = {styles.text}>Add Meal</Text>
                </TouchableOpacity>
        </View>
    )


};

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'column',
        justifyContent: 'center',
        borderWidth: 3, // This sets the width of the border
        borderColor: 'red', // This sets the color of the border
        borderRadius: 10, // This sets the radius of the border, making the edges rounded
        width: 120,
        alignText: 'center',
        margin: 50,
    },
    input: {
        height: 40,
        borderRadius: 10,
        margin: 20,
        borderWidth: 2,
        width: 200,
        textAlign: 'center'

      },

      whole:{ 
        flex: 1,
        alignContent: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      text:{
        textAlign: 'center',
        fontSize: 16,
      },
      Date:{ 
        flexDirection: 'column',
        justifyContent: 'center',
        borderWidth: 1, // This sets the width of the border
        borderColor: 'black', // This sets the color of the border
        borderRadius: 10, // This sets the radius of the border, making the edges rounded
        width: 150,
        alignText: 'center',
      }
});

