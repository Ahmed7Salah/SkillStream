import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import Courses from "./pages/Courses"
import Home from "./pages/Home"
import SignInUp from "./pages/SignInUp"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Routes>
      <Route index element={<Home />} />
      <Route path="signin" element={<SignInUp type="Sign in" />} />
      <Route path="signup" element={<SignInUp type="Sign up" />} />
      <Route path="/courses" element={<Courses />} />
    </Routes>
  </ChakraProvider>
)
