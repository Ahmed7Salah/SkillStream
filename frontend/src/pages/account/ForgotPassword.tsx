import { useFormik } from 'formik'
import FormOutlines from '../../components/AccountForm/FormOutlines'
import CustomInput from '../../components/AccountForm/SmallParts/CustomInput'
import { emailSchema } from '../../schemas/AccountFormValidationSchema'
import { Button } from '@chakra-ui/react'
import { useState } from 'react'
import MessageAlert from '../../components/AccountForm/SmallParts/MessageAlert'
import { useForgotPassword } from '../../hooks/Auth'

const ForgotPassword = () => {

    const [apiError, setApiError] = useState("")
    const [response, setResponse] = useState<{ success: boolean; message: string }>({
      success: false,
      message: "",
    })

    // order of arguments matter!!
    const onSubmit = useForgotPassword(setResponse, setApiError)
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
                {response.success && <MessageAlert success={response.success} message={response.message} />}
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
