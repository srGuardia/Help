import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';

import { SignIn } from '../screens/SignIn';
import { AppRoutes } from './app.routes';

export const Routes = () => {
  const [authenticate] = useState(true);
  return (
    <NavigationContainer>
      {authenticate ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  );
};
