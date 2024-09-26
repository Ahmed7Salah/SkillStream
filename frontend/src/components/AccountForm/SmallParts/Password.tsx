import { Button } from '@chakra-ui/react'
import { GrFormView, GrFormViewHide } from 'react-icons/gr'
import CustomInput from './CustomInput'


interface Props {
  apiError?: string,
  setApiError?: React.Dispatch<React.SetStateAction<string>>,
  showPassword: boolean,
  setShowPassword: Function,
  values: any,
  errors: any,
  touched: any,
  handleChange: any,
  handleBlur: any
}


const Password = ({ apiError, setApiError, showPassword, setShowPassword, values, errors, touched, handleChange, handleBlur } : Props) => {

  return (
          <CustomInput
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              type="password"
              values={values}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
              setApiError={setApiError? setApiError : undefined}
              apiError={apiError ? apiError : undefined}
            >
              <Button
                  right="0"
                  zIndex="10"
                  position="absolute"
                  bg="transparent"
                  h="12"
                  size="xs"
                  _hover={{ bg: "transparent" }}
                  _active={{ bg: "transparent" }}
                  onClick={() => setShowPassword(!showPassword)}
                  rightIcon={
                      showPassword ? <GrFormViewHide size="25" /> : <GrFormView size="25" />
                  }
              />
          </CustomInput>
  )
}

export default Password
