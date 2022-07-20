import { useRoute } from '@react-navigation/native';
import { Text, VStack } from 'native-base';

type RouteParams = {
  orderId: String;
};

export const Details = () => {
  const route = useRoute();

  const { orderId } = route.params as RouteParams;

  return (
    <VStack flex={1} bg='gray.600'>
      <Text color='white'>{orderId}</Text>
    </VStack>
  );
};
