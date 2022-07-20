import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { Center, FlatList, Heading, Stack, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import { Filter } from '../../components/Filter';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Empty } from '../../components/Empty';
import { FilterEnum } from '../../@types/filter';
import { Loading } from '../../components/Loading';
import { dateFormat } from '../../utils/functions';
import { Order } from '../../DTOs/firestore/orderDTO';

export const Dashboard = () => {
  const { navigate } = useNavigation();

  const [isLoading, setIsLoading] = useState(true);

  const [activeFilter, setActiveFilter] = useState({
    open: true,
    close: false,
  });

  const [filter, setFilter] = useState<FilterEnum>(FilterEnum.open);

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection<Order>('orders')
      .where('status', '==', filter)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const { patrimony, created_At, description, status } = doc.data();
          return {
            id: doc.id,
            patrimony,
            description,
            status,
            created_At,
            when: dateFormat(created_At),
          };
        });
        setOrders(data);
        setIsLoading(false);
      });

    return subscriber;
  }, [filter]);

  const handleFilter = (type: FilterEnum) => {
    setFilter(type);
    if (type === FilterEnum.open) {
      setActiveFilter({
        open: true,
        close: false,
      });

      return;
    }

    setActiveFilter({
      open: false,
      close: true,
    });
  };

  const handleDetails = (orderID: String) => {
    navigate('Details', { orderId: orderID });
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <Header />
      <VStack flex={1} px={4} pt={10} pb={Platform.OS === 'ios' ? 10 : 5}>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          mb={6}
        >
          <Center>
            <Heading color='white' fontFamily='heading'>
              Solicitações
            </Heading>
          </Center>
          <Center>
            <Heading color='gray.300' fontFamily='body' fontSize='sm'>
              {orders.length}
            </Heading>
          </Center>
        </Stack>

        <Stack direction='row' alignItems='center' space={3} mb={6}>
          <Center flex={1}>
            <Filter
              title='Em andamento'
              w='full'
              type={FilterEnum.open}
              active={activeFilter.open}
              onPress={() => handleFilter(FilterEnum.open)}
            />
          </Center>

          <Center flex={1}>
            <Filter
              title='Finalizadas'
              w='full'
              type={FilterEnum.close}
              active={activeFilter.close}
              onPress={() => handleFilter(FilterEnum.close)}
            />
          </Center>
        </Stack>

        <FlatList
          keyExtractor={(item) => String(item.id)}
          data={orders.filter((item) => item.status === filter)}
          renderItem={({ item }) => (
            <Card data={item} onPress={() => handleDetails(item.id)} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
          ListEmptyComponent={<Empty type={filter} />}
        />

        <Button
          title='Nova solicitação'
          w='full'
          onPress={() => navigate('Register')}
        />
      </VStack>
    </>
  );
};
