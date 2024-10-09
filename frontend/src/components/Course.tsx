import { Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Text } from '@chakra-ui/react'
import { FaRegHeart } from 'react-icons/fa'
import { VscDebugStart } from 'react-icons/vsc'


interface Props {
  header: string
  description: string
  image: string
  likes: number
}


const Course = ({ header, description, image, likes } : Props) => {
  return (
    <Card 
      bgImage={`url(${image})`}
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      size={"lg"}
      textColor={"teal"}>
        <CardHeader>
            <Heading size='lg'>{header}</Heading>
        </CardHeader>
        <CardBody>
            <p>{description}</p>
        </CardBody>
        <CardFooter display={'block'} justifyContent='flex-end'>
            <Flex justifyContent='space-between' alignItems='center'>
                <Text>{likes} Likes</Text>
                <Flex gap={4} alignItems={'center'}>
                  <Button size={'md'} colorScheme='teal' variant='link' _hover={{color: 'white'}}> <FaRegHeart size={25}/> </Button>
                  <Button size={'lg'} colorScheme='teal' variant='outline' borderColor='teal' _hover={{bg: 'teal.600', color: 'white'}} rightIcon={<VscDebugStart size={20} />}>Enroll Now</Button>
                </Flex>
            </Flex>
        </CardFooter>
    </Card>
  )
}

export default Course
