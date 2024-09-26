import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import Courses from "./pages/Courses"
import Home from "./pages/Home"
import ForgotPassword from "./pages/account/ForgotPassword"
import ResetPassword from "./pages/account/ResetPassword"
import SignIn from "./pages/account/SignIn"
import SignUp from "./pages/account/SignUp"
import NavBar from "./components/NavBar"

export const App = () => (
  <ChakraProvider theme={theme}>
    <NavBar />
    <Routes>
      <Route index element={<Home />} />
      <Route path="/account/signin" element={<SignIn />} />
      <Route path="/account/signup" element={<SignUp />} />
      <Route path="/account/forgot-password" element={<ForgotPassword />} />
      <Route path="/account/reset-password/:userId/:token" element={<ResetPassword />} />
      <Route path="/courses" element={<Courses />} />
    </Routes>
  </ChakraProvider>
)
