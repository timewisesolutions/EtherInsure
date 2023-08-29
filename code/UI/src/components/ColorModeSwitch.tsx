import { HStack, Switch, Text, useColorMode } from '@chakra-ui/react'

const ColorModeSwitch = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <HStack>
            <Switch colorScheme="teal" isChecked={colorMode === 'dark'} onChange={toggleColorMode} />
            <Text as='b' fontSize={10}>Dark Mode</Text>
        </HStack>
    )
}

export default ColorModeSwitch