import '../src/assets/base.css'
import { Layout } from '../src/components/Layout'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'

export default function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider forcedTheme={'dark'}>
            <Layout>
                <Toaster />
                <Component {...pageProps} />
            </Layout>
        </ThemeProvider>
    )
}
