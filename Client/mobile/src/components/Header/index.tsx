import auth from '@react-native-firebase/auth';
import { HStack, IconButton, useTheme } from 'native-base';

import { Octicons } from '@expo/vector-icons';
import Logo from '../../assets/logo_secondary.svg';
import { Alert } from 'react-native';

export const Header = () => {
  const { colors } = useTheme();

  const handleLogOut = () => {
    auth()
      .signOut()
      .catch((err) => {
        console.log(err);

        return Alert.alert('Erro', 'Não foi possível sair.');
      });
  };
  return (
    <HStack
      w='full'
      bg='gray.600'
      h={32}
      justifyContent='space-between'
      alignItems='flex-end'
      pb={6}
      px={4}
    >
      <Logo />

      <IconButton
        icon={<Octicons name='sign-out' color={colors.gray[300]} size={22} />}
        onPress={handleLogOut}
      />
    </HStack>
  );
};
