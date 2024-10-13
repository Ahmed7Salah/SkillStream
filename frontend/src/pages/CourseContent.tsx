import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useFetchCourses, useGetContent } from '../hooks/Courses'
import { Button, Divider, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { useLikeCourse, useUnlikeCourse } from '../hooks/Profile'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

const CourseContent = () => {
  
  const courseId = useParams().courseId
  const course = useSelector((state: any) => state?.courses?.coursesList.find((c: any) => c._id === courseId))
  
  const getContent = useGetContent()
  const [content, setContent] = useState([])
  useEffect(() => {
    (async() => setContent(await getContent(courseId)))();
  }, [])
  
  // TODO: add user's like without fetching
  const user = useSelector((state: any) => state?.account?.user)

  const { likedCourses } = useMemo(() => ({
    likedCourses: user?.likedCourses || [],
  }), [user]);
  
  
  // should I use useState here?
  const [liked, setLiked] = useState(false)

  const fetchCourse = useFetchCourses()

  useEffect(() => {
    if (likedCourses?.find((likedCourse: any) => likedCourse._id === courseId)) setLiked(true)
    else setLiked(false)
  }, [likedCourses, courseId])

  useEffect(() => {
    fetchCourse({id: courseId})
  }, [liked])

  const likeCourse = useLikeCourse();
  const unlikeCourse = useUnlikeCourse();

  // TODO add remove course functionality
  
  return (
    <Flex bg={'gray.50'} backdropBlur={'12px'} fontSize={'2xl'} fontFamily={'helvetica'}>
      <Stack textAlign={'center'} px={{ base: 2, sm: 12, md: 17 }} mx={'auto'} spacing={{ base: 12, md: 16 }} py={{ base: 20, md: 28 }}
      maxW={'6xl'}>
        <Heading fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }} borderBottom={'2px'} borderColor={'gray.300'} pb={5}>{course?.name}</Heading>
        <Text textAlign={'left'}>{`Description: In this course you'll ${course?.description}`}</Text>

        <Text lineHeight={1.7}>{content}</Text>
        <Divider />
        <Text>Do you like this course?</Text>
        <Button onClick={() => liked ? unlikeCourse(courseId) : likeCourse(courseId)} size={'md'} colorScheme='teal' variant='link' _hover={{color: 'teal.400'}}> {liked ? <FaHeart size={25}/> : <FaRegHeart size={25}/>} </Button>
      </Stack>
    </Flex>
  )
}

export default CourseContent
