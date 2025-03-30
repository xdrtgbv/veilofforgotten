import {
    Box,
    Container,
    Stack,
    Text,
    useColorModeValue,
    IconButton,
    useColorMode
} from "@chakra-ui/react"
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"
import { SunIcon, MoonIcon } from "@chakra-ui/icons"

export default function SmallWithSocial() {
    const { colorMode, toggleColorMode } = useColorMode()
    const buttonBg = useColorModeValue("blackAlpha.100", "whiteAlpha.100")
    const hoverBg = useColorModeValue("blackAlpha.200", "whiteAlpha.200")

    return (
        <Box
            bg={useColorModeValue("gray.50", "gray.900")}
            color={useColorModeValue("gray.700", "gray.200")}
            py={4}
        >
            <Container
                maxW="6xl"
                as={Stack}
                direction={{ base: "column", md: "row" }}
                spacing={4}
                justify={{ base: "center", md: "space-between" }}
                align="center"
            >
                <Text>© 2025 Veil Of Forgetten</Text>
                <Stack direction="row" spacing={4}>
                    <IconButton
                        aria-label="Toggle theme"
                        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                        onClick={toggleColorMode}
                        bg={buttonBg}
                        rounded="full"
                        size="sm"
                        _hover={{ bg: hoverBg }}
                    />
                </Stack>
            </Container>
        </Box>
    )
}