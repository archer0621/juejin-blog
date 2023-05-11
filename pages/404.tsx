import Link from "next/link"
import {useRouter} from "next/router"
import React from "react"
import styles from "../styles/404.module.scss"
import Head from "next/head"
const Page404 = () => {
    const router = useRouter()
    return (
        <>
        <Head>404</Head>
        <div className={styles.error_wrap}>
            <div className={styles.error}>
                <div className={styles.error_title}>
                    <h1>404</h1>
                    <h2>Page Not Found</h2>
                </div>
            </div>
            <div className={styles.error_btn_group}>
                <Link
                    href="/"
                    className={styles.error_btn}
                    onClick={() => {
                        router.back()
                    }}
                >
                    返回上一页
                </Link>
                <Link href="/" className={styles.error_btn}>
                    返回主页
                </Link>
            </div>

            <div className={styles.tips}>更多功能正在开发中</div>
        </div>
        </>
    )
}

export default Page404
