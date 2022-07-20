import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { VStack } from 'native-base';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { FilterEnum } from '../../@types/filter';

export const Register = () => {
  const { goBack } = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const [formState, setFormState] = useState({
    patrimony: '',
    description: '',
  });

  const handleNewOrder = () => {
    if (!formState.patrimony || !formState.description)
      return Alert.alert('Atenção', 'Preencha todos os campos!');

    setIsLoading(true);

    firestore()
      .collection('orders')
      .add({
        patrimony: formState.patrimony,
        description: formState.description,
        status: FilterEnum.open,
        created_At: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert('Solicitação', 'Solicitação registrada com sucesso! ✔️');

        return goBack();
      })
      .catch((err) => {
        console.log('Erro', err);
        setIsLoading(false);

        return Alert.alert('Solicitação', 'Erro ao gerar a solicitação! 🔥');
      });
  };

  return (
    <VStack flex={1} p={4} bg='gray.600' space={4}>
      <Input
        placeholder='Número do Patrimônio'
        value={formState.patrimony}
        onChangeText={(value) =>
          setFormState((prevState) => ({ ...prevState, patrimony: value }))
        }
        autoCapitalize='characters'
      />
      <Input
        placeholder='Descrição do problema'
        value={formState.description}
        flex={1}
        multiline
        textAlignVertical='top'
        onChangeText={(value) =>
          setFormState((prevState) => ({ ...prevState, description: value }))
        }
      />

      <Button
        title='Cadastrar'
        w='full'
        onPress={handleNewOrder}
        isLoading={isLoading}
      />
    </VStack>
  );
};
