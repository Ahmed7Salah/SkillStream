import { Button, Card, CardBody, Flex, Heading, HStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'


interface Props {
    header: string
    route: string
    icon: JSX.Element
    children?: JSX.Element[]
}

const ProfileSection = ({ header, icon, children, route }: Props ) => {
  return (
        <Flex as={Link} to={`/profile/${route}`}>
            <Card as={Button} variant='outline' color='teal' height={'250px'} width={'100%'} borderColor={'gray.300'}
            _active={{bg: 'teal.600', color: 'white'}} _hover={{bg: 'teal.600', color: 'white'}}>
                <CardBody alignItems={'center'} justifyContent={'center'} display={"flex"} flexDirection={'column'}>
                        <HStack>
                            {icon}
                            <Heading size='lg'>{header}</Heading>
                        </HStack>
                        <Flex pt={5}>
                            {children}
                        </Flex>
                </CardBody>
            </Card>
        </Flex>
  )
}

export default ProfileSection
