import style from "./Advertisement.module.scss"
import Image from "next/image"
import {NextPage} from "next"
import {SERVERDOMAIN} from "@/utils"
import {useEffect, useRef, useState} from "react"

export interface AdvertisementItemProps {
    id: number
    attributes: {
        title: string
        description: string
        createdAt: Date
        updatedAt: Date
        publishedAt: Date
        url: string
        image: any
        qr_code: any
    }
}

export interface AdvertisementProps {
    AdvertisementData: AdvertisementItemProps
}

const Advertisement: NextPage<AdvertisementProps> = ({AdvertisementData}) => {
    function filterDownload(AdvertisementData: AdvertisementItemProps) {
        return Object.values(AdvertisementData).filter(
            (item) => item.attributes.qr_code.data
        )
    }

    const downloadData = filterDownload(AdvertisementData)

    const [adIsFixed, setAdIsFixed] = useState(false)
    const handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop


        if (scrollTop > 800) {
            setAdIsFixed(true)
        } else {
            setAdIsFixed(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    })
    return (
        <aside className={`${style["advertisement-container"]} ${adIsFixed ? style["fixed"] : style[""]}`}>
            <div className={style["advertisement"]}>
                <Image
                    src={`${SERVERDOMAIN}${AdvertisementData[0].attributes.image.data.attributes.url}`}
                    alt="广告"
                    width={400}
                    height={400}
                    priority
                />
                <div className={style["advertisement-label"]}>
                    <span>广告</span>
                </div>
            </div>
            <div className={style["download-container"]}>
                <Image
                    src={`${SERVERDOMAIN}${downloadData[0].attributes.qr_code.data.attributes.url}`}
                    className={style["download-logo"]}
                    alt="二维码"
                    width={500}
                    height={500}
                />
                <div className={style["download-info"]}>
                    <div className={style["download-headline"]}>
                        {downloadData[0].attributes.title}
                    </div>
                    <div className={style["download-desc"]}>
                        {downloadData[0].attributes.description}
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default Advertisement
