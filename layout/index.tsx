import {NextPage} from "next"
import NavBar from "@/components/NavBar/NavBar"
import FixedBtn from "@/components/FixedBtn/FixedBtn"
import {INavBarItemProps} from "@/components/NavBar/NavBar"
import styles from "./layout.module.scss"
import React, {useEffect, useState} from "react"


export interface ILayoutProps {
    NavData: INavBarItemProps[]
}

const Layout: NextPage<ILayoutProps & { children: JSX.Element }> = ({
                                                                        children,
                                                                        NavData
                                                                    }) => {
    const [IsFixed, setIsFixed] = useState<boolean>(false)

    const [IsLoading, setIsLoading] = useState<boolean>(false)
    useEffect(() => {
        document.addEventListener("scroll", handlerScroll)

        return () => {
            document.addEventListener("scroll", handlerScroll)
        }
    })
    // 滚动事件处理函数
    const handlerScroll = () => {
        const scrollTop =
            document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop > 446) {
            setIsFixed(true)
        } else {
            setIsFixed(false)
        }
    }
    //处理loading
    const handlerLoading = (IsLoading: boolean): void => {
        setIsLoading(IsLoading)
    }


    return (
        <div className={styles.layout_wrapper}>
            <div className={styles.main_header_box}>
                <NavBar NavData={NavData} IsFixed={IsFixed}/>
            </div>
            {React.cloneElement(children, {IsFixed, handlerLoading})}
            <FixedBtn IsLoading={IsLoading}/>
        </div>
    )
}

export default Layout
