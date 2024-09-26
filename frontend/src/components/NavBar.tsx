import { Avatar, AvatarBadge, Button, Heading, HStack } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import SearchBar from './NavBar/SearchBar';

const NavBar = () => {
    const location = useLocation();
    const { loggedIn, user } = useSelector((state: any) => state.account)
    const isInAccountRoute = location.pathname.includes("account")
  return (
    <HStack justifyContent={!isInAccountRoute ? 'space-between' : 'center'} py={3} px={8} bg='teal' color='white'
        boxShadow='lg' borderBottom={'1px'} borderColor={'gray.300'} alignItems='center' h={'10vh'}>
        <HStack spacing={14}>
            <Heading as={Link} to="/" size='lg' bg="white" color="teal" p="1.5" borderRadius="md">SkillStream</Heading>
            {!isInAccountRoute &&
                <HStack spacing={7} fontSize={'18px'}>
                    <Link to='/Courses'>Courses</Link>
                    {/* Add Links here */}
                </HStack>
            }
        </HStack>
        <HStack spacing={7}>
            {!isInAccountRoute && 
                <><SearchBar />
                    {loggedIn ? 
                    <Avatar as={Button} _hover={{bg: "teal.700"}} name={user.name}>
                        <AvatarBadge boxSize='1em' bg='green.500' />
                    </Avatar> 
                    :
                    <>
                        <Button as={Link} to="/account/signin" variant={"outline"} color={'white'} 
                        colorScheme='gray' _hover={{ bg: 'teal.700', borderColor: 'teal.700'}}>Sign in</Button>
                        <Button as={Link} to="/account/signup" color={'teal'} colorScheme='gray'
                        _hover={{ bg: 'teal.700', color: 'white'}}>Join for free</Button>
                    </>}
                </>}
        </HStack>
    </HStack>
  )
}

export default NavBar
