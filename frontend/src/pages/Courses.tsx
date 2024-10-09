import { Grid } from '@chakra-ui/react'
import React from 'react'
import Course from '../components/Course'

const Courses = () => {
  return (
    <Grid gridTemplateColumns={"1fr 1fr"} gridTemplateRows={"1fr 1fr"} p={10} gap={16} color='teal'>
      <Course header="Course 1" description="This is course 1" image={require("../assets/aboutme.jpg")} likes={3} />
      <Course header="Course 2" description="This is course 2" image={require("../assets/aboutme.jpg")} likes={75} />
      <Course header="Course 3" description="This is course 3" image={require("../assets/aboutme.jpg")} likes={4} />
      <Course header="Course 4" description="This is course 4" image={require("../assets/aboutme.jpg")} likes={73} />
    </Grid>
  )
}

export default Courses
