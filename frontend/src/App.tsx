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
import Profile from "./pages/profile/Profile"
import NotFound from "./pages/NotFound"
import Settings from "./pages/profile/Settings"
import LinkedAccounts from "./pages/profile/LinkedAccounts"
import MyCourses from "./pages/profile/MyCourses"
import Following from "./pages/profile/Following"

export const App = () => (
  <ChakraProvider theme={theme}>
    <NavBar />
    <Routes>
      <Route index element={<Home />} />
      <Route path="/account/sign-in" element={<SignIn />} />
      <Route path="/account/sign-up" element={<SignUp />} />
      <Route path="/account/forgot-password" element={<ForgotPassword />} />
      <Route path="/account/reset-password/:userId/:token" element={<ResetPassword />} />

      <Route path="profile" element={<Profile />} />
      <Route path="profile/settings" element={<Settings />} />
      <Route path="profile/my-courses" element={<MyCourses />} />
      <Route path="profile/following" element={<Following />} />
      <Route path="profile/linked-accounts" element={<LinkedAccounts />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </ChakraProvider>
)
