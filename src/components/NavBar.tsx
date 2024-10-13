import { 
  AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogOverlay, Avatar, AvatarBadge, Button, Heading,
  HStack, Menu, MenuButton, MenuItem, MenuList, useDisclosure
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import SearchBar from './NavBar/SearchBar';
import { CgProfile } from "react-icons/cg";
import { GiThreeFriends } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import { IoMdSettings } from "react-icons/io";
import { useLogout } from '../hooks/Auth';
import { useEffect, useRef, useState } from 'react';

const NavBar = () => {
    const location = useLocation();
    const { loggedIn, user } = useSelector((state: any) => state.account)
    const isInAccountRoute = location.pathname.includes("/account")
    const [signOutMessage, setSignOutMessage] = useState<string>('')
    const logout = useLogout(setSignOutMessage)
    
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
      let timer: NodeJS.Timeout;
      if (isOpen) {
        // Set a timeout to automatically close the alert after 0.8 second
        timer = setTimeout(() => {
          onClose();
        }, 800);
      }
      
      // Clear the timeout if the dialog closes or unmounts
      return () => {
        clearTimeout(timer);
      };
    }, [isOpen, onClose]);

  return (
    <>
    <HStack justifyContent={!isInAccountRoute ? 'space-between' : 'center'} py={3} px={8} bg='teal' color='white'
        boxShadow='lg' alignItems='center' h={'10vh'} position='sticky' top={0} zIndex={10}>
        <HStack spacing={14}>
            <Heading as={Link} to="/" size='lg' bg="white" color="teal" p="1.5" borderRadius="md">SkillStream</Heading>
            {!isInAccountRoute &&
                <HStack spacing={7} fontSize={'18px'}>
                    <Link to='/courses'>Courses</Link>
                    {/* Add Links here */}
                </HStack>
            }
        </HStack>
        <HStack spacing={7}>
            {!isInAccountRoute && 
                <><SearchBar />
                    {loggedIn ?
                    <Menu>
                    <MenuButton
                      as={Avatar}
                      src={user?.avatar?.url}
                      p={user?.avatar?.url ? 0 : 5}
                      _hover={{bg: "teal.700"}}
                      name={user?.name}
                      cursor='pointer'
                      transition='all 0.2s'
                      borderRadius='full'
                      _expanded={{ bg: 'teal.800' }}
                      _focus={{ boxShadow: 'outline' }}
                    >
                        {/* <Avatar as={Button} _hover={{bg: "teal.700"}} name={user.name}>
                            <AvatarBadge boxSize='1em' bg='green.500' />
                        </Avatar> */}
                    </MenuButton>
                    <MenuList color="black">
                      <MenuItem as={Link} to={"/profile"} icon={<CgProfile size={20} />}>Profile</MenuItem>
                      <MenuItem as={Link} to={"/profile/following"} icon={<GiThreeFriends size={20} />}>Following</MenuItem>
                      {/* <MenuItem >Status</MenuItem> */}
                      <MenuItem as={Link} to={"/profile/settings"} icon={<IoMdSettings size={20} />} >Settings</MenuItem>
                      <MenuItem onClick={() => {logout(); onOpen()}} icon={<FiLogOut size={20} />}>Log out</MenuItem>
                    </MenuList>
                  </Menu>
                    :
                    <>
                        <Button as={Link} to="/account/sign-in" variant={"outline"} color={'white'} 
                        colorScheme='gray' _hover={{ bg: 'teal.700', borderColor: 'teal.700'}}>Sign in</Button>
                        <Button as={Link} to="/account/sign-up" color={'teal'} colorScheme='gray'
                        _hover={{ bg: 'teal.700', color: 'white'}}>Join for free</Button>
                    </>}
                </>}
        </HStack>
    </HStack>
    <AlertDialog
    leastDestructiveRef={cancelRef}
    motionPreset='slideInBottom'
    onClose={onClose}
    isOpen={isOpen}
    isCentered
    >
    <AlertDialogOverlay />

    <AlertDialogContent>
      <AlertDialogHeader textAlign={'center'}>{signOutMessage}</AlertDialogHeader>
    </AlertDialogContent>
  </AlertDialog>
  </>
  )
}

export default NavBar
