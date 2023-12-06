import react from 'react';
import { View, Button,styles } from 'react-native';


export default function HomeScreenMenu({navigation}) {
    return (
        <View >
            {/* <Button title="settings" onPress={() => navigation.navigate('settigns')} /> */}
            <Button title="Daily Calorie Goal" onPress={() => navigation.navigate('changeDailyGoal')} />
            {/* <Button title="" onPress={() => navigation.navigate('DeleteMeal')} />
            <Button title="Sign Out" onPress={() => navigation.navigate('SignOut')} /> */}
        </View>
    );
}

