import ProfileLayout from '../../components/Profile/ProfileLayout'
import { useFormik } from 'formik';
import { updateProfileSchema } from '../../schemas/AccountFormValidationSchema';
import PasswordAndConfirmPass from '../../components/AccountForm/SmallParts/PasswordAndConfirmPass';
import { Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import CustomInput from '../../components/AccountForm/SmallParts/CustomInput';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import { useUpdateProfile } from '../../hooks/Profile';



const Settings = () => {
    
    const updateProfile = useUpdateProfile();
    const onSubmit = (values: any, { resetForm }: { resetForm: () => void }) => {
      // Filter out empty values
      const filteredValues = Object.fromEntries(
        Object.entries(values).filter(([key, value]) => value !== "")
      )
      updateProfile({ ...filteredValues, onSuccess: () => resetForm() });
    };
      

    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: {
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        },
        validationSchema: updateProfileSchema,
        onSubmit,
      });

  return (<>
    <ProfileLayout>
      <ProfileHeader title="Settings" />
      <GridItem colSpan={2}>
      <form autoComplete='off' onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '1rem'}}>
          <Grid gridTemplateColumns={"1fr 1fr"} gridTemplateRows={"1fr 1fr"} gap={8} width={"100%"}>
            <GridItem>
              <Text fontWeight={"bold"} mb={3} ml={1}>Name</Text>
              <CustomInput
                  type="name"
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  required={false}
              />  
            </GridItem>
            <GridItem>
              <Text fontWeight={"bold"} mb={3} ml={1}>Email</Text>
                  <CustomInput
                      type="email"
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      required={false}
                  />
            </GridItem>
            <GridItem>
              <Text fontWeight={"bold"} mb={3} ml={1}>Password</Text>
              <Flex flexDirection={"column"} gap={6}>
                <PasswordAndConfirmPass
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    required={false}
                />
              </Flex>
            </GridItem>
            <GridItem rowStart={3} colStart={2} display={"flex"} alignItems={"flex-end"} justifyContent={"flex-end"}>
              <Button colorScheme="teal" size="lg" h="14" fontSize="xl" type="submit">Update Profile</Button>
            </GridItem>
          </Grid>
          </form>
          </GridItem>
    </ProfileLayout>
    </>
  )
}

export default Settings
