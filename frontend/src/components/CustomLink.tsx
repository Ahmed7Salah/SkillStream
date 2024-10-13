import { Flex, Img } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const CustomLink = ({ img, name, url }: { img: string, name: string, url: string }) => {
  return (
    <Flex as={Link} to={url} target='_blank' justifyContent={'center'} alignItems={'center'}
    _hover={{ cursor: 'pointer', bg: 'teal.700', borderColor: 'teal.700', transition: 'all 0.2s ease-in-out' }}
    color={'white'} borderRadius={'md'} w={'10'} h={'10'} p={1}>
        <Img
        src={img}
        alt={name}
        w={'8'} />
    </Flex>
  )
}

export default CustomLink
