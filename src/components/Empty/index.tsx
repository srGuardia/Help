import { Heading, Text, VStack } from 'native-base';
import { FilterEnum } from '../../@types/filter';

import EmptyData from '../../assets/empty_data.svg';

type EmptyProps = {
  type: FilterEnum;
};

export const Empty = ({ type }: EmptyProps) => (
  <VStack flex={1} alignItems='center' justifyContent='center'>
    <EmptyData width={150} height={250} />
    <Heading
      color='gray.300'
      fontFamily='body'
      fontSize='md'
      textAlign='center'
    >
      Você não possui {'\n'}
      solicitações&nbsp;
      <Text color='white' fontFamily='heading'>
        {type === FilterEnum.open ? 'em andamento' : 'finalizadas'}
      </Text>
    </Heading>
  </VStack>
);
