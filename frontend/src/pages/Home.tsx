import { useSelector } from "react-redux"

const Home = () => {
  const user = useSelector((state: any) => state.user)
  return (
    <div>
      {user && <h1>Welcome, {user.name}</h1>}
    </div>
  )
}

export default Home
