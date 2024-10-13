import { Flex, Stack, VStack } from '@chakra-ui/react'
import FormHeader from './FormHeader'


interface Props {
  topSwitcher?: JSX.Element,
  children?: JSX.Element[] | JSX.Element,
  header: JSX.Element | string,
  headerContent: string
  headerChildren?: JSX.Element
}

const FormOutlines = ( { topSwitcher, children, header, headerContent, headerChildren }: Props) => {
  return (
    <Flex
      as="main"
      h="fit-content"
      minHeight="90vh"
      w="100vw"
      bg="gray.100"
      p="8"
      justify="center"
    >
      <VStack
        mx="auto"
        bg="gray.50"
        h="fit-content"
        w="35%"
        border="1px"
        borderColor="gray.300"
        borderRadius="md"
        spacing="8"
        py='8'
        {...topSwitcher ? { pt: '20' } : {}}
        boxShadow="md"
        justify="center"
        position="relative"
      >
        {topSwitcher}
        <Stack as="section" align="center" spacing="5">
            <FormHeader header={header} content={headerContent}>
                {headerChildren}
            </FormHeader>
        </Stack>
            {children}
      </VStack>
    </Flex>
  )
}

export default FormOutlines
