import { useCallback, useState } from 'react';
import { Center, FlatList, Heading, Stack, VStack } from 'native-base';

import { Filter } from '../../components/Filter';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Platform } from 'react-native';
import { FilterEnum } from '../../@types/filter';
import { Order } from '../../@types/order';
import { Empty } from '../../components/Empty';
import { useNavigation } from '@react-navigation/native';

export const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState({
    open: true,
    close: false,
  });

  const { navigate } = useNavigation();

  const [filter, setFilter] = useState<FilterEnum>(FilterEnum.open);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: '01',
      patrimony: '121212',
      when: '18/07/2022 às 10:00',
      status: FilterEnum.open,
    },
    {
      id: '02',
      patrimony: '808089890',
      when: '18/07/2022 às 14:45',
      status: FilterEnum.close,
    },
    {
      id: '03',
      patrimony: '99098',
      when: '18/07/2022 às 14:45',
      status: FilterEnum.open,
    },
  ]);

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

  return (
    <>
      <Header />
      <VStack flex={1} px={4} pt={10} pb={Platform.OS === 'ios' ? 10 : 0}>
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
