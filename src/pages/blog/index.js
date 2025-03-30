// pages/index.js
import { useState, useEffect } from 'react'
import {
    Box,
    Container,
    Heading,
    SimpleGrid,
    Card,
    CardBody,
    CardFooter,
    Text,
    Link,
    Button,
    Flex,
    useColorModeValue
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import supabase from '@/utils/supabaseClient'
import Head from "next/head";

const MotionCard = motion(Card)

export default function Home() {
    const [posts, setPosts] = useState([])
    const bgColor = useColorModeValue('gray.50', 'gray.800')
    const cardBg = useColorModeValue('white', 'gray.800')
    const textColor = useColorModeValue('gray.600', 'gray.400')
    const headingColor = useColorModeValue('gray.800', 'white')

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) console.error('Error fetching posts:', error)
        else setPosts(data)
    }

    const truncateHtml = (html, maxLength) => {
        const div = document.createElement('div')
        div.innerHTML = html
        const text = div.textContent || div.innerText || ''
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
    }

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    }

    return (
        <>
            <Head>
                <title>Blog | Velil Of Forgetten</title>
                <link rel="icon" type="image/x-icon" href="/images/katana.svg"/>
            </Head>
            <Container maxW="container.xl" py={{base: 8, md: 12}} bg={bgColor}>
            <Flex
                justify="space-between"
                align="center"
                mb={{ base: 8, md: 12 }}
                direction={{ base: 'column', md: 'row' }}
                gap={6}
            >
                <Heading
                    as="h1"
                    size={{ base: 'xl', md: '2xl' }}
                    color={headingColor}
                    fontWeight="bold"
                    letterSpacing="tight"
                >
                    Blog
                </Heading>
                <Link href="/blog/create-blog">
                    <Button
                        variant="outline"
                        colorScheme="gray"
                        size={{ base: 'md', md: 'lg' }}
                        borderWidth={2}
                        _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
                        transition="all 0.2s"
                    >
                        New Post
                    </Button>
                </Link>
            </Flex>

            <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3 }}
                spacing={{ base: 6, md: 8 }}
            >
                {posts.map((post, index) => (
                    <MotionCard
                        key={post.id}
                        bg={cardBg}
                        borderRadius="md"
                        overflow="hidden"
                        shadow="sm"
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        borderWidth={1}
                        borderColor={useColorModeValue('gray.200', 'gray.700')}
                        h="100%"
                        display="flex"
                        flexDirection="column"
                    >
                        <CardBody p={{ base: 4, md: 6 }}>
                            <Text
                                fontSize="sm"
                                color={textColor}
                                mb={3}
                                fontWeight="medium"
                            >
                                {new Date(post.created_at).toLocaleDateString()}
                            </Text>
                            <Heading
                                size="md"
                                mb={4}
                                color={headingColor}
                                fontWeight="semibold"
                                noOfLines={2}
                                minH="2.5em"
                            >
                                {post.title}
                            </Heading>
                            <Text
                                color={textColor}
                                fontSize={{ base: 'sm', md: 'md' }}
                                noOfLines={3}
                            >
                                {truncateHtml(post.content, 120)}
                            </Text>
                        </CardBody>
                        <CardFooter mt="auto" p={{ base: 4, md: 6 }} pt={0}>
                            <Link href={`/blog/${post.id}`} width="100%">
                                <Button
                                    variant="ghost"
                                    colorScheme="gray"
                                    width="100%"
                                    size={{ base: 'sm', md: 'md' }}
                                    _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
                                >
                                    Read More
                                </Button>
                            </Link>
                        </CardFooter>
                    </MotionCard>
                ))}
            </SimpleGrid>
        </Container>
        </>
    )
}