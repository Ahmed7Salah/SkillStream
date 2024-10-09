import { Avatar, Button, ButtonGroup, Flex, Grid, GridItem, Heading, Spinner, Text } from '@chakra-ui/react'
import { closeSnackbar, useSnackbar } from 'notistack'
import { useEffect, useRef, useState } from 'react'
import { useFetchUser, useUpdateProfile } from '../../hooks/Profile'
import { useSelector } from 'react-redux'

const ProfileLayout = ({ children }: { children?: JSX.Element[] | JSX.Element }) => {
    const ref = useRef<HTMLInputElement>(null)
    const [isOpen, setIsOpen] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [image, setImage] = useState<string | undefined>()
    const {name, avatar} = useSelector((state: any) => state.account.user)
    const { enqueueSnackbar } = useSnackbar();
    const updateProfile = useUpdateProfile();
    const fetchUser = useFetchUser()


    useEffect(() => {
        fetchUser()
    }, [])

    useEffect(() => {
        setImage(avatar.url)
    }, [avatar])


    const handleChange = (e: any) => {
        const file = e.target.files[0]
        closeSnackbar()

        if (file) {
            if (!file.type.startsWith("image/")) {
                enqueueSnackbar('The selected file is not an image', { variant: 'error' });
                return;
            }

            // Optionally, check for file size
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                enqueueSnackbar('File size exceeds the limit (5MB)', { variant: 'error' });
                return;
            }

            setIsOpen(ref.current?.files?.length !== 0)

            const reader = new FileReader()
            reader.onloadend = () => {
                setImage(reader.result as string)
            }
            reader.readAsDataURL(file)

        }
    }


    const saveProfilePicture = async () => {
        setIsOpen(false)
        setIsUploading(true)
        if (image) {
            updateProfile({avatar: image, cb: () => setIsUploading(false)})

            setImage(undefined)
            ref.current && (ref.current.value = '')
        }
    }


    const discardProfilePicture = () => {
        setImage(undefined)
        ref.current && (ref.current.value = '')
        setIsOpen(false)
    }
  return (
    <Grid gridTemplateColumns={"1fr 1fr 1fr"} gridTemplateRows={"1fr 1fr"} p={10} gap={16} color='teal'>
        <GridItem as={Heading} display={'flex'} colSpan={3} rowSpan={2} textAlign={'center'} justifyContent={'center'}>
            <Text borderBottom={'2px'} borderColor={'gray.300'} pb={5} width={'70%'}>
                Profile
            </Text>
        </GridItem>
            <GridItem as={Flex} boxShadow={'lg'} border={'1px'} borderColor={'gray.300'} borderRadius={'lg'} p={10}
            direction={'column'} justifyContent={'center'} alignItems={'center'}>

                <Avatar as={Button} src={image} onClick={() => ref.current?.click()} _hover={{bg: 'teal.600', color: 'white'}}
                name={name} width={"200px"} height="200px" p={0} border={'2px'} style={{borderColor: 'teal'}} />

                <Text textAlign={'center'} fontSize={'2xl'} fontWeight={'bold'} mt={5}>{name}</Text>

                <input type="file" ref={ref} accept="image/*" onChange={handleChange} hidden />
                <ButtonGroup visibility={isOpen ? 'visible' : 'hidden'} mt={5}>
                    <Button onClick={discardProfilePicture} variant='outline' color='teal' borderColor={'teal'} _hover={{bg: 'teal.600', color: 'white'}}> Cancel </Button>
                    <Button onClick={saveProfilePicture} variant='outline' color='teal' borderColor={'teal'}  _hover={{bg: 'teal.600', color: 'white'}}> Save Profile Picture </Button>
                </ButtonGroup>

                <Spinner size={'xl'} visibility={isUploading ? 'visible' : 'hidden'} />

            </GridItem>
            <Grid as={GridItem} boxShadow={'lg'} border={'1px'} borderColor={'gray.300'} borderRadius={'lg'}
                gridTemplateColumns={"1fr 1fr"} p={16} gap={16} colSpan={2}>
                {children}
            </Grid>
    </Grid>
  )
}

export default ProfileLayout
