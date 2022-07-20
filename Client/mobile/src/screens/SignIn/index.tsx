import { useState } from 'react';
import { Heading, Icon, VStack, useTheme } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';

import Logo from '../../assets/logo_primary.svg';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Alert } from 'react-native';

export const SignIn = () => {
  const { colors } = useTheme();

  const [formState, setFormState] = useState({ email: '', password: '' });
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      if (!formState.email || !formState.password)
        return Alert.alert('Entrar', 'Informe e-mail e senha');

      setLoading(true);

      const {} = await auth()
        .signInWithEmailAndPassword(formState.email, formState.password)
        .catch((err) => {
          setLoading(false);
          console.log('Erro', err);

          if (err.code === 'auth/invalid-email')
            return Alert.alert('Erro', 'E-mail inválido.');

          if (err.code === 'auth/wrong-password')
            return Alert.alert('Erro', 'E-mail ou senha inválida.');

          if (err.code === 'auth/user-not-found')
            return Alert.alert('Erro', 'Usuário não cadastrado');
        });
    } catch (error) {
      setLoading(false);
      console.log('', error);
    }
  };

  return (
    <VStack flex={1} alignItems='center' bg='gray.600' px={8} pt={24}>
      <Logo />
      <Heading fontSize='xl' color='gray.100' mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <Input
        placeholder='E-mail'
        autoCapitalize='none'
        mb={4}
        InputLeftElement={
          <Icon
            as={FontAwesome}
            name='envelope'
            color={colors.gray[300]}
            ml={4}
          />
        }
        value={formState.email}
        onChangeText={(value) =>
          setFormState((prevState) => ({ ...prevState, email: value }))
        }
      />
      <Input
        autoCapitalize='none'
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

      <Button
        title='Entrar'
        w='full'
        onPress={handleSubmit}
        isLoading={loading}
        isLoadingText='Autenticando...'
      />
    </VStack>
  );
};
