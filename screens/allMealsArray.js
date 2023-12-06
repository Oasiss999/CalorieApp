import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode as atob } from 'base-64';
import { useFocusEffect } from '@react-navigation/native';



function decodeJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
  };


export default function AllMealsArray() {
    const [meals, setMeals] = useState([]);



    useFocusEffect(
        React.useCallback(() => {
          const fetchToken = async () => {
            const jwtToken = await AsyncStorage.getItem('@jwt');
            const decoded = decodeJwt(jwtToken);
            const id = decoded.id;
            axios.get('http://localhost:3000/getAllMeals', {
              params: {
                user_id: id,
              }
            })
            .then(function (response) {
                
              setMeals(response.data);
             
            })
            .catch(function (error) {
              console.log("There was an error in all meals: " ,error);
            });
          }
          fetchToken();
        }, [])
      );

    return (
        <View>
            {meals.map((meal, index) => (
                <View key={index}  style={styles.container}>
                    <Text style= {styles.text1}>Meal Name: {meal.meal}</Text>
                    <Text style= {styles.text2}>Date: {new Date(meal.date).toLocaleDateString()}</Text>
                    <Text style= {styles.text2}>Calories: {meal.calories}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'black',   
        borderRadius: 20,
        margin: 10, 
        backgroundColor:'white'  
      },
      text1: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        margin: 10,
        backgroundColor:'#DAACFE'
        
      },
      text2: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
       
      }
}); 