import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AllMealsArray from './allMealsArray';
import { ImageBackground } from 'react-native';

const backgroundImage = require('/Users/oasis/Documents/caloiretrack/assets/mainBack.png'); 

export default function AllMeals() {
    return (
        
        <SafeAreaView style={styles.container}>
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
          <ScrollView style={styles.scrollView}>
            <AllMealsArray/>
          </ScrollView>
            </ImageBackground>
        </SafeAreaView>
        
        
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      ImageBackground: 'transparent',
      
    },
    scrollView: {
      backgroundColor: 'white',
      marginHorizontal: 20,
      backgroundColor: 'transparent',
    },
    text: {
      fontSize: 42,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },
  });