import { Heading, Icon, VStack, useTheme } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';

import Logo from '../../assets/logo_primary.svg';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export const SignIn = () => {
  const { colors } = useTheme();
  const { navigate } = useNavigation();

  const [formState, setFormState] = useState({ name: '', password: '' });
  const [visiblePassword, setVisiblePassword] = useState(false);

  const handleSubmit = () => {
    navigate('Dashboard');
    setFormState({ name: '', password: '' });
  };

  return (
    <VStack flex={1} alignItems='center' bg='gray.600' px={8} pt={24}>
      <Logo />
      <Heading fontSize='xl' color='gray.100' mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <Input
        placeholder='E-mail'
        mb={4}
        InputLeftElement={
          <Icon
            as={FontAwesome}
            name='envelope'
            color={colors.gray[300]}
            ml={4}
          />
        }
        value={formState.name}
        onChangeText={(value) =>
          setFormState((prevState) => ({ ...prevState, name: value }))
        }
      />
      <Input
        placeholder='Password'
        mb={8}
        InputLeftElement={
          <Icon as={FontAwesome} name='lock' color={colors.gray[300]} ml={4} />
        }
        InputRightElement={
          <Icon
            as={FontAwesome}
            name={visiblePassword ? 'eye-slash' : 'eye'}
            color={colors.gray[300]}
            mr={4}
            onPress={() => setVisiblePassword((prevState) => !prevState)}
          />
        }
        secureTextEntry={!visiblePassword}
        value={formState.password}
        onChangeText={(value) =>
          setFormState((prevState) => ({ ...prevState, password: value }))
        }
      />

      <Button title='Entrar' w='full' onPress={handleSubmit} />
    </VStack>
  );
};
