import { FormControl, FormErrorMessage, Input } from '@chakra-ui/react'

interface Props {
    apiError?: string
    setApiError?: React.Dispatch<React.SetStateAction<string>>
    showPassword?: boolean
    setShowPassword?: Function
    children?: JSX.Element
    type: string
    values: any
    errors: any
    touched: any
    handleChange: any
    handleBlur: any
}
const EmailInput = ({ apiError, setApiError, showPassword, children, type, values, errors, touched, handleChange, handleBlur } : Props) => {
    
  return (
        <FormControl isInvalid={(!!errors[type] && touched[type]) || !!apiError}>
            <Input
                placeholder={toTitleCase(type)}
                value={values[type]}
                onChange={setApiError ? (e) => {
                    handleChange(e)
                    setApiError("")
                } : handleChange}
                onBlur={handleBlur}
                size="lg"
                type={( type === "password" || type === "confirmPassword" )? showPassword ? "text" : "password" : type}
                name={type}
                required
                borderColor="gray.400"
            />
            {children}
            <FormErrorMessage>{apiError ? apiError : errors[type]}</FormErrorMessage>
        </FormControl>
  )
}


function toTitleCase(str: string) {
    return str
        .replace(/([A-Z])/g, ' $1')
        .split(' ')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export default EmailInput

