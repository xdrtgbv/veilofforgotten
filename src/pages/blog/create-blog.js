// pages/create-blog.js
import { useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Container, Heading, Input, Button } from '@chakra-ui/react'
import { Editor } from '@tinymce/tinymce-react'
import supabase from '@/utils/supabaseClient'

export default function CreateBlog() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const router = useRouter()

    const handleSubmit = async () => {
        const { data, error } = await supabase
            .from('posts')
            .insert([{ title, content }])
            .select()

        if (error) {
            console.error('Hiba a poszt létrehozásakor:', error)
        } else {
            console.log('Poszt létrehozva:', data)
            const newPostId = data[0].id
            router.push(`/blog/${newPostId}`)
        }
    }

    return (
        <Container maxW="container.md" py={10}>
            <Heading as="h1" mb={8}>Új Blogposzt Létrehozása</Heading>
            <Input
                placeholder="Cím"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                mb={4}
            />
            <Editor
                apiKey="in4kz75nyp75t0etshedzj91sitn2mjzdj579njizavei1qg"
                value={content}
                onEditorChange={(newContent) => setContent(newContent)}
                init={{
                    height: 500,
                    menubar: true, // Teljes menüsor bekapcsolása
                    plugins: [
                        // Minden elérhető plugin (ingyenes és alap prémium, ha az API kulcs támogatja)
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'print', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'paste', 'code', 'help', 'wordcount',
                        'emoticons', 'template', 'codesample', 'textpattern', 'noneditable',
                        'quickbars', 'imagetools', 'hr', 'directionality', 'pagebreak', 'nonbreaking',
                        'visualchars', 'spellchecker', 'importcss', 'save', 'legacyoutput',
                    ],
                    toolbar: [
                        // Teljes eszköztár, több sorban
                        'undo redo | formatselect fontselect fontsizeselect | bold italic underline strikethrough | ' +
                        'forecolor backcolor removeformat | alignleft aligncenter alignright alignjustify | ' +
                        'bullist numlist outdent indent | link image media table | hr pagebreak nonbreaking anchor | ' +
                        'charmap emoticons codesample insertdatetime | preview print fullscreen | ' +
                        'searchreplace spellchecker visualblocks visualchars code help',
                        'ltr rtl | save | template quickimage quicktable quicklink | pastetext pasteword | ' +
                        'subscript superscript blockquote | cut copy paste selectall'
                    ].join(' '), // Több soros toolbar összefűzése
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }', // Alapértelmezett stílus
                    image_advtab: true, // Haladó képbeállítások
                    file_picker_types: 'file image media', // Fájlválasztó támogatása
                    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote', // Gyors eszköztár
                    contextmenu: 'link image table', // Jobb klikk menü
                    toolbar_mode: 'wrap', // Eszköztár gördülékeny megjelenítése
                    spellchecker_language: 'hu', // Magyar helyesírás-ellenőrzés (ha támogatott)
                }}
            />
            <Button mt={4} colorScheme="blue" onClick={handleSubmit}>
                Poszt Létrehozása
            </Button>
        </Container>
    )
}