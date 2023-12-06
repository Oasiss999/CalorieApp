import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Buttons from '../buttons/homescreenButtons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode as atob } from 'base-64';
import { useFocusEffect } from '@react-navigation/native';
import HomeScreenMenu from '../buttons/HomeScreenMenu';
import {  Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ImageBackground } from 'react-native';
import { ProgressBar, Colors } from 'react-native-paper';

//load image that i want to use as the sign in screens background
const backgroundImage = require('/Users/oasis/Documents/caloiretrack/assets/HomeScreenBack.png'); 

//decode the jwt token to get the user id
function decodeJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};


export default function HomeScreen({navigation}) {

  //create constants for variables that i will need to display on the home screen
  const[DailyGoal,setDailyGoal] = useState(0);
  const [calories, setCalories] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  
 
 
//use focus for dropdown menu so that when a user leaves the main screen and comes back
//the dropdown menu will be closed
 
  useFocusEffect(
    React.useCallback(() => {
      return () => setIsDropdownOpen(false);
    }, [])
  );

  //use focus effect to get the daily goal and the calories for the day so that if the user 
  //leaves the main screen and comes back the daily goal and calories will be updated
  //in case they added a meal or changed their daily goal
  useFocusEffect(
    React.useCallback(() => {
      const fetchToken = async () => {
        const jwtToken = await AsyncStorage.getItem('@jwt');
        const decoded = decodeJwt(jwtToken);
        const id = decoded.id;
        console.log('ID: ',id)
        // Make the axios request after the token is fetched
        axios.get('http://localhost:3000/TodaysCals', {
          params: {
            user_id: id,
          }
        })
          .then(function (response) {
            
            setCalories(response.data);
          })
          .catch(function (error) {
            console.log("There was an error: " ,error);
          });
      }
      fetchToken();
    }, [])
  );

// another use focus effect to get the JWT token because a user can click to back into the sign in screen
// so if they come back to the home screen the token will be fetched again to check who is logged in currently 
useFocusEffect(
  React.useCallback(() => {
    const fetchToken = async () => {
      const jwtToken = await AsyncStorage.getItem('@jwt');
      const decoded = decodeJwt(jwtToken);
      const id = decoded.id;
      axios.get('http://localhost:3000/getDailyGoal', {
        params: {
          user_id: id,
        }
      })
      .then(function (response) {
        
        setDailyGoal(response.data);
      })
      .catch(function (error) {
        console.log("There was an error: " ,error);
      });
    }
    fetchToken();
  }, [])
);
let progress = calories/DailyGoal;

//checks to see if the progress after division is either NaN, less than 0, or infinity to catch cases that
//could cause the progress bar to break
if (isNaN(progress) || progress<0 || progress==Infinity) {
  progress = 0; 

}
//checking to see if progress is bigger then one to just set to 1 so that the progress bar doesnt go over 100%
if(progress>1){
  progress = 1;
}
  return (
    
     <ImageBackground source={backgroundImage} style={styles.backgroundImage}>

    <View style={styles.container}>

    <View style={styles.dropdownMenu}>
    <Ionicons //icon object for the dropdown menu
      name="ios-settings"
      size={24}
      color="gray"
      onPress={() => setIsDropdownOpen(!isDropdownOpen)}
      
    />
  </View>
    {isDropdownOpen && ( 
      <View style={styles.dropdownMenu}>
        <Button title="Change Daily Goal" onPress={() => navigation.navigate('changeDailyGoal')} />
        <Button title="Delete Account" onPress={() => navigation.navigate('DeleteAccount')} />
        <Button title="All Meals" onPress={() => navigation.navigate('AllMeals')} />
      </View>
  )}

 
  <View style={styles.add}>
    <Buttons navigation={navigation} /> 
  </View>
  <View >
        <Text style ={styles.caloriesText} >
        {calories}
        </Text>
      </View>
      <View style={styles.progressBarContainer}>  
      <ProgressBar progress={progress} color={'red'} style={styles.progressBar}/>
      <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
      </View>
      <View style={styles.add}>
        <Buttons navigation={navigation} /> 
      </View>
    </View>
    </ImageBackground>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignContent: 'center',
  },
  progressBarContainer: {
    position: 'absolute',
    top: 450, 
    left: 100,
    width: '50%', 
    height: 40, 
  },
  progressBar: {
    height: '70%',
    width: '100%',
  },
  progressText: {
    position: 'absolute',
    top: 0, 
    left: '40%', 
    fontSize:18,
    
  },
  add: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 24, 
    right: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  caloriesText:{
    position: 'absolute',
    top: 10, 
    left: 150,
    width: '50%', 
    fontSize: 50,
   
  },
  icon: { 
    backgroundColor: 'transparent',
  },
});