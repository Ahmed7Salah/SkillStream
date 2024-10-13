import { Button, Flex, Grid, HStack } from '@chakra-ui/react'
import Course from '../components/Course'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import { useFetchCourses } from '../hooks/Courses'

const Courses = () => {
  const courses = useSelector((state: any) => state?.courses)
  const enrolledCourses = useSelector((state: any) => state.account?.user?.courses)

  const fetchCourses = useFetchCourses()

  const pages = new Array(courses?.pages).fill(0).map((_, i) => i + 1)

  const [page, setPage] = useState(1)

  useEffect(() => {
    // Fetch courses on mount
    fetchCourses({page});
  }, [page])

  return (
    <Flex direction={'column'}>
      <Grid gridTemplateColumns={"1fr 1fr"} gridTemplateRows={"1fr 1fr"} p={10} gap={16} color='teal'>
        {courses?.coursesList?.map((course: any, index: number) => (
          <Course key={index}
            {...course}
            progress={enrolledCourses?.find((c: any) => c.course._id === course._id)?.progress}
            id={course._id}
          />
        ))}
      </Grid>
      <HStack mx={'auto'} gap={2} mb={20}>
        <Button background={'transparent'} _hover={{bg: 'gray.200'}} size={'sm'} disabled={page === 1} onClick={() => setPage(page - 1)}><GrFormPrevious size={20} /></Button>
        <HStack>
          {pages?.map((p: number) => (
            <Button key={p} background={'transparent'} _hover={{bg: 'gray.200'}} size={'sm'} onClick={() => setPage(p)}>{p}</Button>
          ))}
        </HStack>
        <Button background={'transparent'} _hover={{bg: 'gray.200'}} size={'sm'} disabled={page === courses?.pages} onClick={() => setPage(page + 1)}><GrFormNext size={20} /></Button>
      </HStack>
    </Flex>
  )
}

export default Courses
