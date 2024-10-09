import { Button, GridItem, Text } from '@chakra-ui/react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router-dom'

const ProfileHeader = ({ title } : { title: string }) => {
  return (
    <>
    <Button as={Link} to={'/profile'} size={'md'} position={'absolute'} colorScheme='teal' variant='outline' borderColor='teal' 
    _hover={{bg: 'teal.600', color: 'white'}} mt={'-7'} ml={'-7'} onClick={() => window.history.back()}><IoMdArrowRoundBack size={25} /></Button>
    <GridItem colSpan={2}>
        <Text borderBottom={'2px'} fontSize={'xl'} fontWeight={'bold'} borderColor={'gray.300'} 
        width={'25%'} mx={'auto'} mt={'-6'} textAlign={'center'} height={'40px'}>
            {title}
        </Text>
    </GridItem>
    </>
  )
}

export default ProfileHeader
