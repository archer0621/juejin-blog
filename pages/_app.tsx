import "@/styles/globals.scss"
import type {AppProps} from "next/app"
import App, {AppContext} from "next/app"
import Layout from "@/layout"
import Head from "next/head"
import axios from "axios"
import {LanguageContextProvider} from "@/stores/language"
import {ThemeContextProvider} from "@/stores/theme"
import {UserAgentProvider} from "@/stores/userAgent"
import {INavBarItemProps} from "@/components/NavBar/NavBar"
import "@fortawesome/fontawesome-free/css/all.min.css"
import {SERVERDOMAIN} from "@/utils"
import Page404 from "@/pages/404"

interface INavBarProps {
    data: INavBarItemProps[]
}

const MyApp = (Props: AppProps & INavBarProps): JSX.Element => {
    const {Component, pageProps, data} = Props

    return (
        <div>
            <Head>
                <title>J-Blog</title>
                <meta name="description"
                      content="模仿掘金的技术内容分享与交流平台。我们通过技术文章、沸点、课程、直播等产品和服务，打造一个激发开发者创作灵感，激励开发者沉淀分享，陪伴开发者成长的综合类技术社区。"/>
                <meta name="keywords" content="掘金,稀土,Vue.js,前端面试题,Kotlin,ReactNative,Python"/>
                <meta name="viewport" content="user-scalable=no"/>
                <meta name="viewport" content="initial-scale=1,maximum-scale=1"/>
                <link rel="icon" href="/logo_light.svg"/>
            </Head>
            <LanguageContextProvider>
                <ThemeContextProvider>
                    <UserAgentProvider>
                        <Layout NavData={data}>
                            <Component {...pageProps} />
                        </Layout>
                    </UserAgentProvider>
                </ThemeContextProvider>
            </LanguageContextProvider>
        </div>
    )
}

MyApp.getInitialProps = async (context: AppContext): Promise<AppProps> => {
    const pageProps = await App.getInitialProps(context)
    const res = await axios.get(`${SERVERDOMAIN}/api/top-tabs?populate=*`)

    return Object.assign({}, pageProps, res.data)
}

export default MyApp
