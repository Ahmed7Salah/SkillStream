import { useState } from 'react'
import Password from './Password';
import CustomInput from './CustomInput';


interface Props {
    values: any,
    errors: any,
    touched: any,
    handleChange: any,
    handleBlur: any
    required?: boolean
}

const PasswordAndConfirmPass = ({ values, errors, touched, handleChange, handleBlur, required } : Props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
        <Password 
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            values={values}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
            required={required === undefined ? true : required}
        />
        <CustomInput
            showPassword={showPassword}
            type="confirmPassword"
            values={values}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
            required={required === undefined ? true : required}
        />
    </>
  )
}

export default PasswordAndConfirmPass
