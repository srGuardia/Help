import { HStack, IconButton, useTheme } from 'native-base';

import { Octicons } from '@expo/vector-icons';
import Logo from '../../assets/logo_secondary.svg';

export const Header = () => {
  const { colors } = useTheme();
  return (
    <HStack
      w='full'
      bg='gray.600'
      h={32}
      justifyContent='space-between'
      alignItems='flex-end'
      pb={6}
      px={4}
    >
      <Logo />

      <IconButton
        icon={<Octicons name='sign-out' color={colors.gray[300]} size={22} />}
      />
    </HStack>
  );
};
