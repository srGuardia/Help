import { Heading, Pressable, IPressableProps } from 'native-base';

type FilterProps = IPressableProps & {
  title: String;
  type: 'open' | 'close';
  active?: Boolean;
};

export const Filter = ({ title, type, active, ...rest }: FilterProps) => (
  <Pressable
    bg='gray.600'
    borderColor={
      active ? (type === 'open' ? 'secondary.700' : 'green.300') : 'transparent'
    }
    borderWidth={1}
    rounded={4}
    py={2}
    px={4}
    {...rest}
  >
    <Heading
      color={
        active ? (type === 'open' ? 'secondary.700' : 'green.300') : 'gray.300'
      }
      fontSize='sm'
      fontFamily='body'
      textAlign='center'
      fontWeight='light'
      textTransform='uppercase'
    >
      {title}
    </Heading>
  </Pressable>
);
