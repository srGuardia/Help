import { Box, HStack, Text, useTheme, VStack } from 'native-base';
import { IVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack';
import { ReactElement, ReactNode } from 'react';
import { IconType } from 'react-icons';

type CardDetailsProps = IVStackProps & {
  title: string;
  description?: string;
  footer?: string | null;
  icon: ReactElement;
  children?: ReactNode;
};

export const CardDetails = ({
  title,
  description,
  footer = null,
  icon: Icon,
  children,
}: CardDetailsProps) => {
  return (
    <VStack bg='gray.600' p={5} rounded='sm' mb={5}>
      <HStack alignItems='center' mb={4}>
        {Icon}
        <Text ml={2} color='gray.300' fontSize='sm' textTransform='uppercase'>
          {title}
        </Text>
      </HStack>

      {!!description && (
        <Text color='gray.100' fontSize='md'>
          {description}
        </Text>
      )}

      {children}

      {!!footer && (
        <Box borderTopColor='gray.400' borderTopWidth={1} mt={3}>
          <Text color='gray.300' fontSize='sm'>
            {footer}
          </Text>
        </Box>
      )}
    </VStack>
  );
};
