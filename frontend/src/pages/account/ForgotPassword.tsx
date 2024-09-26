import { useFormik } from 'formik'
import FormOutlines from '../../components/AccountForm/FormOutlines'
import CustomInput from '../../components/AccountForm/SmallParts/CustomInput'
import { emailSchema } from '../../schemas/AccountFormValidationSchema'
import { Button } from '@chakra-ui/react'
import { useState } from 'react'
import MessageAlert from '../../components/AccountForm/SmallParts/MessageAlert'

const ForgotPassword = () => {

    const [apiError, setApiError] = useState("")
    const [success, setSuccess] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const onSubmit = async ({ email }: { email: string }) => {
      const res = await fetch("http://localhost:5000/user/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        credentials: 'include'
      }).then((res) => res.json())
      .catch((err) => console.log(err))
      if (res.success) {
        setSuccess(true)
        setSuccessMessage(res.message)
      } else {
        setApiError(res.message)
      }
    }

    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: {
          email: "",
        },
        validationSchema: emailSchema,
        onSubmit,
      })

  return (
    <FormOutlines
        header="Forgot Password"
        headerContent="Enter your email address and we will send you a link to reset your password.">
            <form autoComplete='off' onSubmit={handleSubmit} style={{ width: '70%', display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '1rem'}}>
                {success && <MessageAlert success={success} message={successMessage} />}
                <CustomInput
                    type="email"
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    apiError={apiError}
                    setApiError={setApiError}
                />
                <Button mt="2" colorScheme="teal" size="lg" w="45%" h="14" fontSize="xl" type="submit">Send Email</Button>
            </form>
    </FormOutlines>
  )
}

export default ForgotPassword
