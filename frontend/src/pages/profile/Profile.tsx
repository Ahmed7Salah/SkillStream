import ProfileSection from '../../components/Profile/ProfileSection'
import { GiShadowFollower, GiThreeFriends } from 'react-icons/gi'
import { ImBooks } from "react-icons/im";
import { HiLink } from "react-icons/hi";
import { IoMdSettings } from 'react-icons/io';
import ProfileLayout from '../../components/Profile/ProfileLayout';


const Profile = () => {

  return (
    <ProfileLayout>
        <ProfileSection
            header={"Courses"}
            icon={<ImBooks size={50} />}
            route={'my-courses'}
        >
            {/* {courses} */}
        </ProfileSection>
        <ProfileSection
            header={"Following"}
            icon={<GiThreeFriends size={50} />}
            route={'following'}
        >
            {/* {friends} */}
        </ProfileSection>
        <ProfileSection
            header={"Settings"}
            icon={<IoMdSettings size={50} />}
            route={'settings'}
        />
        {/* <ProfileSection
            header={"Linked Accounts"}
            icon={<HiLink size={50} />}
            route={'linked-accounts'}
        /> */}
        <ProfileSection
            header={"Followers"}
            icon={<GiShadowFollower size={50} />}
            route={'followers'}
        ></ProfileSection>

    </ProfileLayout>
  )
}

export default Profile
