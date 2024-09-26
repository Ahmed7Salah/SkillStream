import { useSelector } from "react-redux"

const Home = () => {
  const { loggedIn, user } = useSelector((state: any) => state.account)
  return (
    <div>
      {loggedIn && <h1>Welcome, {user.name}</h1>}
    </div>
  )
}

export default Home
