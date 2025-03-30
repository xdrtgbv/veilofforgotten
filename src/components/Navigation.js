"use client"
import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    useColorModeValue,
    useDisclosure,
    Avatar,
    Image,
    Link,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react"
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons"
import supabase from "@/utils/supabaseClient"
import { useState, useEffect } from "react"

export default function SimpleNav() {
    const { isOpen, onToggle } = useDisclosure()
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)

    // Fetch user session and profile on mount
    useEffect(() => {
        const fetchUserAndProfile = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            const currentUser = session?.user

            if (currentUser) {
                setUser(currentUser)
                const { data, error } = await supabase
                    .from("profiles")
                    .select("username, avatar_url")
                    .eq("id", currentUser.id)
                    .single()

                if (error) {
                    console.error("Error fetching profile:", error)
                } else {
                    setProfile(data)
                }
            }
        }

        fetchUserAndProfile()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            const currentUser = session?.user
            setUser(currentUser)
            if (currentUser) {
                fetchUserAndProfile()
            } else {
                setProfile(null)
            }
        })

        return () => subscription.unsubscribe()
    }, [])

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error("Error logging out:", error)
        } else {
            setUser(null)
            setProfile(null)
        }
    }

    return (
        <Box>
            <Flex
                bg={useColorModeValue("white", "gray.800")}
                color={useColorModeValue("gray.600", "white")}
                minH={"60px"}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={"solid"}
                borderColor={useColorModeValue("gray.200", "gray.900")}
                align={"center"}
            >
                <Flex
                    flex={{ base: 1, md: "auto" }}
                    ml={{ base: -2 }}
                    display={{ base: "flex", md: "none" }}
                >
                    <IconButton
                        onClick={onToggle}
                        icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
                        variant={"ghost"}
                        aria-label={"Toggle Navigation"}
                    />
                </Flex>

                <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
                    <Link href={"/"}>
                        <Image src={"/images/logo.png"} height={50} alt="Logo" />
                    </Link>
                </Flex>

                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={"flex-end"}
                    direction={"row"}
                    spacing={6}
                    align="center"
                >
                    <Button as={"a"} variant={"link"} href={"/blog"} fontSize="sm">
                        Blog
                    </Button>
                    <Button as={"a"} href={"/download"} fontSize="sm" px={4}>
                        Letöltés
                    </Button>
                    {user ? (
                        <Menu>
                            <MenuButton>
                                <Avatar
                                    size="sm"
                                    src={profile?.avatar_url}
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem>{profile?.username || "User"}</MenuItem>
                                <MenuItem onClick={handleLogout}>Kijelentkezés</MenuItem>
                            </MenuList>
                        </Menu>
                    ) : (
                        <Button
                            as={"a"}
                            href="/login"
                            variant="outline"
                            colorScheme="pink"
                            size="sm"
                        >
                            Bejelentkezés
                        </Button>
                    )}
                </Stack>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav user={user} profile={profile} handleLogout={handleLogout} />
            </Collapse>
        </Box>
    )
}

const MobileNav = ({ user, profile, handleLogout }) => {
    return (
        <Stack
            bg={useColorModeValue("white", "gray.800")}
            p={4}
            display={{ md: "none" }}
        >
            <Button as="a" href="/blog" variant="ghost" w="full">
                Blog
            </Button>
            <Button as="a" href="/download" colorScheme="pink" w="full">
                Letöltés
            </Button>
            {user && profile && (
                <Stack spacing={2} pt={2}>
                    <Flex align="center" justify="center">
                        <Avatar
                            size="sm"
                            src={profile.avatar_url}
                        />
                        <Text ml={2}>{profile.username}</Text>
                    </Flex>
                    <Button variant="ghost" w="full" onClick={handleLogout}>
                        Kijelentkezés
                    </Button>
                </Stack>
            )}
        </Stack>
    )
}