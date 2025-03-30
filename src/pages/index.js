"use client"

import {
    Box,
    Container,
    Flex,
    Heading,
    Text,
    Image,
    VStack,
    HStack,
    List,
    ListItem,
    ListIcon,
    useColorModeValue,
    Button,
    Center
} from "@chakra-ui/react"
import Link from "next/link"
import {CheckCircleIcon} from "@chakra-ui/icons"
import {motion} from "framer-motion"
import {Cabin_Condensed} from "next/dist/compiled/@next/font/dist/google";
import Head from "next/head";

const MotionBox = motion(Box)

export default function MainContent() {
    return ( <>
        <Head>
            <title>Velil Of Forgetten</title>
            <link rel="icon" type="image/x-icon" href="/images/katana.svg"/>
        </Head>
        <Box>
            {/* Hero Section */}
            <Box
                height={800}
                bgImage="url('/images/bg.png')"
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
                            Egy 18 éve várakozó küzdelem, játsz most, és éld át a harcot!
                        </Heading>
                        <Button
                            colorScheme="pink"
                            size={{base: "md", md: "lg"}} // Responsive button size
                            as="a"
                            href="download"
                            mt={4}
                        >
                            Kezdj bele most
                        </Button>
                    </VStack>
                </Container>
            </Box>

            {/* Web Design Section */}
            <Box as="section" py={10} id="kar-section">
                <Container maxW="container.xl">
                    <Flex direction={{base: "column", lg: "row"}} gap={8} align="center">
                        <Box w={{base: "100%", lg: "50%"}}>
                            <Heading as="h2" size="xl" color="blue.500" mb={4}>
                                2D történetvezetés
                            </Heading>
                            <Text mb={4}>
                                Egy 18 éve várakozó ninja küzdelem, éld át a történetet 2D-ben és harcolj 3D-ben.
                            </Text>
                            <List spacing={2}>
                                <ListItem>
                                    <ListIcon as={CheckCircleIcon} color="blue.500"/>
                                    Misztikus világ
                                </ListItem>
                                <ListItem>
                                    <ListIcon as={CheckCircleIcon} color="blue.500"/>
                                    Izgalmas történet
                                </ListItem>
                                <ListItem>
                                    <ListIcon as={CheckCircleIcon} color="blue.500"/>
                                    Magávalragadó karakterek
                                </ListItem>
                            </List>
                        </Box>
                        <Box w={{base: "100%", lg: "50%"}}>
                            <Image
                                src="/images/image.png"
                                alt="Ryan Gosling"
                                maxH={{base: "300px", md: "500px"}} // Responsive image height
                                objectFit="cover"
                                w="full"
                                boxShadow={"13px 13px 14px -6px #000000"}
                            />
                        </Box>
                    </Flex>
                    <Flex
                        mt={100}
                        mb={100}
                        align={'center'}
                        _before={{
                            content: '""',
                            borderBottom: '1px solid',
                            borderColor: useColorModeValue('gray.700', 'gray.700'),
                            flexGrow: 1,
                            mr: 8,
                        }}
                        _after={{
                            content: '""',
                            borderBottom: '1px solid',
                            borderColor: useColorModeValue('gray.700', 'gray.700'),
                            flexGrow: 1,
                            ml: 8,
                        }}>
                        <Image src={"/images/logo.png"} height={75}/>
                    </Flex>
                    <Flex direction={{base: "column", lg: "row"}} gap={8} align="center">
                        <Box w={{base: "100%", lg: "50%"}}>
                            <Image
                                src="/images/image-2.png"
                                alt="Ryan Gosling"
                                maxH={{base: "300px", md: "500px"}} // Responsive image height
                                objectFit="cover"
                                w="full"
                                boxShadow={"13px 13px 14px -6px #000000"}
                            />
                        </Box>
                        <Box w={{base: "100%", lg: "50%"}}>
                            <Heading as="h2" size="xl" color="blue.500" mb={4}>
                                3D harcrendszer
                            </Heading>
                            <Text mb={4}>
                                Állj bosszút a klánodért akiket lemészároltak, és számolj le a ninjákat évek óta fenyegtő samuraiokkal.
                            </Text>
                        </Box>
                    </Flex>
                    <Center>
                        <Heading as="h2" size="xl" color="blue.500" mb={4} mt={100}>
                            Veil Of Forgotten
                        </Heading>
                    </Center>
                    <Center><Text textAlign={"center"} maxW={"5xl"}>Momonosuke egy Ninja klánba született, amit egy tragikus napon két Samurai lemészárolt. Momonosukét a szülei elrejtették az erdőben. A játék ez után 18 évvel játszódik, vedd kezedbe az irányítást és bosszuld meg a klánodat!</Text>
                    </Center>

                    <Center>
                        <Box mt={20} mb={10}>
                            <Heading as="h2" size="xl" color="blue.500" mb={4} mt={5}>A kaland itt kezdődik!</Heading>
                            <Center>
                                <Link href="/download" passHref>
                                <Button variant={"outline"} colorScheme={"gray"} mt={3}>
                                    Kezdj bele
                                </Button>
                                </Link>
                            </Center>
                        </Box>
                    </Center>

                </Container>
            </Box>
        </Box>
        </>
    )
}