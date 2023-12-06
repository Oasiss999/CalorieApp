// ButtonContainer.js
import React from 'react';
import { View, Button } from 'react-native';

const ButtonContainer = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Button title="Add Meal" onPress={() => navigation.navigate('AddMeal')} />
  
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
  },
};

export default ButtonContainer;
