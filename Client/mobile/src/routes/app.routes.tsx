import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { IconButton, useTheme } from 'native-base';
import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';
import { Details } from '../screens/Details';

const { Screen, Navigator, Group } = createNativeStackNavigator();

export const AppRoutes = () => {
  const { colors, fonts } = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        statusBarTranslucent: true,
        contentStyle: {
          backgroundColor: colors.gray[700],
        },
      }}
    >
      <Screen name='Dashboard' component={Dashboard} />

      <Group
        screenOptions={({ navigation }) => ({
          title: 'Solicitação',
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.gray[600],
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontFamily: fonts.heading,
          },
          headerTitleAlign: 'center',
          headerLeft: ({ tintColor }) => (
            <IconButton
              icon={
                <Ionicons
                  name='chevron-back-sharp'
                  color={tintColor}
                  size={22}
                />
              }
              onPress={navigation.goBack}
            />
          ),
        })}
      >
        <Screen name='Register' component={Register} />
        <Screen name='Details' component={Details} />
      </Group>
    </Navigator>
  );
};
