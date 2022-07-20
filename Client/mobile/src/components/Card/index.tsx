import {
  Box,
  Center,
  Heading,
  HStack,
  Icon,
  IPressableProps,
  Pressable,
  Stack,
} from 'native-base';

import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { FilterEnum } from '../../@types/filter';
import { Order } from '../../DTOs/firestore/orderDTO';

type CardProps = IPressableProps & {
  data: Order;
};

export const Card = ({ data, ...rest }: CardProps) => {
  return (
    <Pressable
      w='full'
      h={24}
      bg='gray.600'
      mb={4}
      px={4}
      borderLeftColor={
        data.status === FilterEnum.open ? 'secondary.700' : 'green.300'
      }
      borderLeftWidth={10}
      overflow='hidden'
      rounded='sm'
      {...rest}
    >
      {({ isPressed }) => {
        return (
          <Box style={{ transform: [{ scale: isPressed ? 0.96 : 1 }] }}>
            <HStack alignItems='center' w='full' h='full'>
              <Stack
                flex={2}
                direction='column'
                alignItems='flex-start'
                space={2}
              >
                <Heading
                  color='white'
                  fontFamily='heading'
                  fontSize='md'
                  numberOfLines={1}
                >
                  Patrimônio&nbsp;{data.patrimony}
                </Heading>

                <HStack alignItems='center' space={2}>
                  <Icon as={FontAwesome5} name='clock' size='sm' />
                  <Heading color='gray.300' fontFamily='body' fontSize='sm'>
                    {data.when}
                  </Heading>
                </HStack>
              </Stack>

              <Center justifyContent='center' bg='gray.400' rounded={50} p={2}>
                <Icon
                  as={MaterialCommunityIcons}
                  name={
                    data.status === FilterEnum.open
                      ? 'timer-sand-empty'
                      : 'check-decagram-outline'
                  }
                  color={
                    data.status === FilterEnum.open
                      ? 'secondary.700'
                      : 'green.300'
                  }
                  size='2xl'
                />
              </Center>
            </HStack>
          </Box>
        );
      }}
    </Pressable>
  );
};
