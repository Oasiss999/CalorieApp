
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddMealScreen from './screens/AddMealScreen';
import SignupScreen from './screens/SignupScreen';
import SignIn from './screens/SignIn';
import ChangeDailyGoal from './screens/changeDailyGoal';
import DeleteAccount from './screens/DeleteAccount';
import Allmeals from './screens/AllMeals';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>

        <Stack.Screen name='SignIn' component={SignIn}/>
        <Stack.Screen name='Home' component={HomeScreen}/>
        <Stack.Screen name='AddMeal' component={AddMealScreen}/>
        <Stack.Screen name='Signup' component={SignupScreen}/>
        <Stack.Screen name='DeleteAccount' component={DeleteAccount}/>
        <Stack.Screen name='changeDailyGoal' component={ChangeDailyGoal}/>
        <Stack.Screen name='AllMeals' component={Allmeals}/>
      </Stack.Navigator>

    </NavigationContainer>
  );
}


