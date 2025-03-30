"use client"
import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    Button,
    Center,
    Link
} from "@chakra-ui/react"
import {motion} from "framer-motion"
import {useEffect, useState} from "react";
import supabase from "@/utils/supabaseClient";

const MotionBox = motion(Box)

export default function MainContent() {
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
    return (
        <Box>
            {/* Hero Section */}
            <Box
                height={800}
                bgImage="url('/images/image-3.png')"
                bgSize="cover"
                bgPosition="center"
                py={{base: 10, md: 20}} // Responsive padding
                position="relative"
                display="flex" // Make it a flex container
                alignItems="center" // Vertically center the content
                justifyContent="center" // Horizontally center (optional, since Container already centers)
                _after={{
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "100px", // Height of the shadow
                    bg: "linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent)", // Shadow effect
                }}
            >
                <Container maxW="container.md" textAlign="center">
                    <VStack spacing={6}>
                        <Heading
                            as="h1"
                            size={{base: "xl", md: "2xl"}} // Responsive heading size
                            color="white"
                            textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
                        >
                            Kezdj bele még most, kezd el letölteni játékunkat.
                        </Heading>

                            {profile ?
                                <Link href="https://drive.google.com/uc?export=download&id=1iDl3HsI5gQ7vWdWSh6SW0viqVyxbMFNO" download>
                        <Button
                            colorScheme="pink"
                            size={{base: "md", md: "lg"}} // Responsive button size
                            mt={4}
                        >
                            Letöltés
                        </Button></Link> :
                                 <Box>
                                <Text color={"white"}>Letöltéshez jelentkezz be itt:</Text><Link href="/login" color={"white"}>Kattints ide!</Link>
                                 </Box>
                            }
                    </VStack>
                </Container>
            </Box>

            {/* Web Design Section */}
            <Box as="section" py={10} id="kar-section" mb={50}>
                <Container maxW="container.xl">
                    <Center>
                        <Heading as="h2" size="xl" color="blue.500" mb={4} mt={75}>
                            Egy végzetes csata kezdetei
                        </Heading>
                    </Center>
                    <Text textAlign={"center"}>Játékunk letöltésével elmerülhetsz Momonosuke izgalmas és fordulatokkal teli kalandjaiban, ahol egy lenyűgöző, veszélyekkel teli világ vár rád. Éld át a bosszúszomjas ninja lenyűgöző történetét, aki eltökélten küzd, hogy visszaszerezze családja elvesztett becsületét, és igazságot szolgáltasson azoknak, akik ártottak neki. Csatlakozz hozzá epikus küldetésén, harcolj ádáz ellenfelekkel, fedezz fel rejtett titkokat, és bizonyítsd be, hogy te vagy a legügyesebb és legelszántabb harcos. A családod becsületéért vívott harc során minden lépésed számít, hiszen a sorsod a kezedben van – készen állsz, hogy legendává válj?</Text>
                </Container>
            </Box>
        </Box>
    )
}
