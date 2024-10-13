import { Button, Input, InputGroup, InputRightAddon } from '@chakra-ui/react'
import { useRef } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { useFindUser } from '../../hooks/User';

const SearchBar = () => {

  const ref = useRef<HTMLInputElement>(null)

  const search = useFindUser()

  return (
    <InputGroup size="md">
        <Input type="text" ref={ref} focusBorderColor="white" _focus={{boxShadow: 'none'}} placeholder="Search..." border="1px solid" borderRadius={'full'} />
        <InputRightAddon
          as={Button}
          onClick={() => search({ name: ref?.current?.value })}
          size={"lg"}
          borderRightRadius={'full'}
          p={0}
          border="none"
        >
          <IoMdSearch size={25} />
        </InputRightAddon>
      </InputGroup>
  )
}

export default SearchBar
