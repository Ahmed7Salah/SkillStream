import UsersOverlay from '../../components/Profile/UsersOverlay'
import { useSelector } from 'react-redux'

const Following = () => {
  const following = useSelector((state: any) => state?.account?.user?.following)
  return (
    <UsersOverlay users={following} title="Following" />
  )
}

export default Following
