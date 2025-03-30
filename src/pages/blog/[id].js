// pages/posts/[id].js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Container, Heading, Text } from '@chakra-ui/react'
import supabase from '@/utils/supabaseClient'

export default function Post() {
    const router = useRouter()
    const { id } = router.query
    const [post, setPost] = useState(null)

    useEffect(() => {
        if (id) fetchPost()
    }, [id])

    const fetchPost = async () => {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('id', id)
            .single()

        if (error) console.error('Hiba a poszt lekérdezésekor:', error)
        else setPost(data)
    }

    if (!post) return <Text>Betöltés...</Text>

    return (
        <Container maxW="5xl" py={10}>
            <Heading as="h1" mb={4}>{post.title}</Heading>
            <Text dangerouslySetInnerHTML={{ __html: post.content }} />
        </Container>
    )
}