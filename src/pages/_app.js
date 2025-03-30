// pages/_app.js
import {ChakraProvider} from '@chakra-ui/react'
import Footer from "@/components/Footer"
import Navigation from "@/components/Navigation"

function MyApp({Component, pageProps}) {
    return (
        <ChakraProvider>
            <Navigation/>
            <Component {...pageProps} />
            <Footer/>
        </ChakraProvider>
    )
}

export default MyApp