import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react"


interface Props {
    success: boolean
    message: string
}


const MessageAlert = ({success, message}: Props) => {
  return (
        <Alert status={success ? 'success' : 'error'} variant={'solid'} colorScheme={success ? "teal" : undefined}>
            <AlertIcon />
            <AlertTitle>{message}</AlertTitle>
        </Alert>
  )
}

export default MessageAlert
