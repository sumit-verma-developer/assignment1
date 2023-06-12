import { createStackNavigator } from '@react-navigation/stack';
import {CardStyleInterpolators} from '@react-navigation/stack';
import Details from '../pages/Details';
import Home from '../pages/Home';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
     screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        keyboardHidesTabBar: true,
      }}>


    <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}