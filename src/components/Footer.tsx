import { Flex, Text } from '@chakra-ui/react'
import CustomLink from './CustomLink'
const Footer = () => {
  return (
    <Flex
      as="footer"
      direction="column"
      justifyContent="flex-end"
      w="100%"
      h="15lvh"
      mt={16}
      bg='teal'
      color='white'
      boxShadow='lg'
      px={8}
      py={7}
    >
        <Flex 
           justifyContent="space-between"
           alignItems={"center"}>
            <Text fontSize="xs">Copyright © 2024 - All rights reserved</Text>
            <Flex gap={2}>
                <CustomLink
                    name={"GitHub"}
                    img={require("../assets/github.png")}
                    url={"https://github.com/Ahmed7Salah"} />
                <CustomLink
                    name={"LinkedIn"}
                    img={require("../assets/linkedin.png")}
                    url={"https://www.linkedin.com/in/ahmed7salah"} />
            </Flex>
        </Flex>

    </Flex>
  )
}

export default Footer
