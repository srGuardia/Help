import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { HStack, Icon, ScrollView, Text, VStack } from 'native-base';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Order } from '../../DTOs/firestore/orderDTO';
import { dateFormat } from '../../utils/functions';
import { Loading } from '../../components/Loading';
import { FilterEnum } from '../../@types/filter';
import { CardDetails } from '../../components/Card/CardDetails';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Alert } from 'react-native';

type RouteParams = {
  orderId: string;
};

type OrderDetails = Order & {
  closed?: string;
};

export const Details = () => {
  const route = useRoute();
  const { orderId } = route.params as RouteParams;

  const { goBack } = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [formSolution, setFormSolution] = useState('');
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);

  useEffect(() => {
    firestore()
      .collection<Order>('orders')
      .doc(orderId)
      .get()
      .then((doc) => {
        const {
          patrimony,
          description,
          status,
          solution,
          created_At,
          closed_At,
        } = doc.data() as Order;

        const closed = closed_At && dateFormat(closed_At);

        setOrder({
          id: doc.id,
          patrimony,
          description,
          status,
          solution,
          when: dateFormat(created_At),
          created_At,
          closed,
        });

        setIsLoading(false);
      });
  }, []);

  const handleFinishOrder = () => {
    if (!formSolution)
      return Alert.alert(
        'Solicitação',
        'Informe a solução para encerrar a solicitação.'
      );

    firestore()
      .collection<Order>('orders')
      .doc(orderId)
      .update({
        status: FilterEnum.close,
        solution: formSolution,
        closed_At: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        goBack();
      })
      .catch((err) => {
        console.log('Erro', err);
        return Alert.alert(
          'Solicitação',
          'Houve um problema ao encerrar a solicitação! 🧐'
        );
      });
  };

  if (isLoading) return <Loading />;

  return (
    <VStack flex={1}>
      <HStack bg='gray.500' justifyContent='center' p={4} mb={4}>
        <Icon
          as={MaterialCommunityIcons}
          name={
            order.status === FilterEnum.open
              ? 'timer-sand-empty'
              : 'check-decagram-outline'
          }
          color={
            order.status === FilterEnum.open ? 'secondary.700' : 'green.300'
          }
          size='xl'
        />

        <Text
          fontSize='sm'
          color={
            order.status === FilterEnum.open ? 'secondary.700' : 'green.300'
          }
          ml={2}
          textTransform='uppercase'
        >
          {order.status === FilterEnum.open ? 'em andamento' : 'finalizado'}
        </Text>
      </HStack>

      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails
          title='equipamento'
          description={`Patrimônio ${order.patrimony}`}
          icon={
            <Icon
              as={MaterialCommunityIcons}
              name='desktop-tower-monitor'
              color='primary.700'
              size='md'
            />
          }
        />

        <CardDetails
          title='descrição do problema'
          description={order.description}
          icon={
            <Icon
              as={MaterialCommunityIcons}
              name='clipboard-text-outline'
              color='primary.700'
              size='md'
            />
          }
          footer={`Registrado em ${order.when}`}
        />

        <CardDetails
          title='solução'
          description={order.solution}
          icon={
            <Icon
              as={MaterialCommunityIcons}
              name='check-decagram-outline'
              color='primary.700'
              size='md'
            />
          }
          footer={order.closed && `Encerrado em ${order.closed}`}
        >
          {!order.solution && (
            <Input
              placeholder='Descrição da solução'
              h={40}
              multiline
              textAlignVertical='top'
              value={formSolution}
              onChangeText={setFormSolution}
            />
          )}
        </CardDetails>
      </ScrollView>

      {!order.closed && (
        <Button title='Finalizar' w='full' onPress={handleFinishOrder} />
      )}
    </VStack>
  );
};
