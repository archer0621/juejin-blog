import classes from "./BusinessCard.module.scss"
import Link from "next/link"
import {FC, Fragment, useState} from "react";
import Image from "next/image";

export interface BusinessCardData {

    avatar_large: string,
    user_id: number,
    user_name: string,
    level: string,
    job_title: string,
    company: string,
    got_digg_count: number,
    got_view_count: number

}

export interface BusinessCardProps {
    BusinessCardData: BusinessCardData
}


const BusinessCard: FC<BusinessCardProps> = (props) => {
    const [Follow, setFollow] = useState(false);
    // 数字添加千分符
    const numFormat = (num: number): string => {
        const str = num.toString()
        let arr = str.split('')
        arr.reverse()
        if (num > 1000) {
            for (let i = 2; i < arr.length; i += 4) {
                arr.splice(i + 1, 0, ',')
            }
            if (arr[arr.length - 1] === ',') arr.pop()
            return arr.reverse().join('')
        }
        return str
    }
    // 关注
    const changeFollow = () => {
        const followBtn = document.querySelector("#followBtn") as HTMLButtonElement
        if (!Follow) {
            followBtn.style.cursor = 'not-allowed'
            followBtn.style.backgroundColor = 'rgb(242, 243, 245)'
            followBtn.style.color = '#8a919f'
            setTimeout(() => {
                followBtn.innerHTML = '已关注'
                followBtn.style.cursor = 'pointer'
            }, 500)
            setFollow(true)
        } else if (Follow) {
            followBtn.style.cursor = 'not-allowed'
            setTimeout(() => {
                followBtn.innerHTML = '关注'
                followBtn.style.cursor = 'pointer'
                followBtn.style.backgroundColor = ' #1d7dfa'
                followBtn.style.color = '#fff'
            }, 500)
            setFollow(false)
        }
    }
    return (
        <Fragment>
            <div className={classes.businessCard}>
                <Link href={"/"} className={classes.userItem}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className={classes.img} src={(props.BusinessCardData.avatar_large).replace(/\\u002F/g, "/")}
                         width={48} height={48}
                         alt="avatar"/>
                    <div className={classes.infoBox}>
                            <span className={classes.userName}>{props.BusinessCardData.user_name}
                                <Image alt={`level${props.BusinessCardData.level}`} width={35} height={16}
                                       src={`/images/lv-${props.BusinessCardData.level}.png`}/></span>
                        <div
                            className={classes.position}>{props.BusinessCardData.job_title}{props.BusinessCardData.company ? ' @ ' + props.BusinessCardData.company : ''}</div>
                    </div>
                </Link>
                <div className={classes.operateBtn}>
                    <button id={"followBtn"} className={classes.unfollow} onClick={changeFollow}>
                        关注
                    </button>
                    <button className={classes.message}>私信</button>
                </div>
                <div className={classes.cutOff}/>
                <ul>
                    <li className={classes.statItem}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="26" viewBox="0 0 25 26"
                             className="zan" data-v-71f2d09e="" data-v-bdf6e7fa="">
                            <g fill="none" fillRule="evenodd" transform="translate(0 .57)" data-v-71f2d09e=""
                               data-v-bdf6e7fa="">
                                <ellipse cx="12.5" cy="12.57" fill="#E1EFFF" rx="12.5" ry="12.57" data-v-71f2d09e=""
                                         data-v-bdf6e7fa=""/>
                                <path fill="#7BB9FF"
                                      d="M8.596 11.238V19H7.033C6.463 19 6 18.465 6 17.807v-5.282c0-.685.483-1.287 1.033-1.287h1.563zm4.275-4.156A1.284 1.284 0 0 1 14.156 6c.885.016 1.412.722 1.595 1.07.334.638.343 1.687.114 2.361-.207.61-.687 1.412-.687 1.412h3.596c.38 0 .733.178.969.488.239.317.318.728.21 1.102l-1.628 5.645a1.245 1.245 0 0 1-1.192.922h-7.068v-7.889c1.624-.336 2.623-2.866 2.806-4.029z"
                                      data-v-71f2d09e="" data-v-bdf6e7fa=""/>
                            </g>
                        </svg>
                        <div
                            className={classes.content}>获得点赞 <span> {numFormat(props.BusinessCardData.got_digg_count)}</span>
                        </div>
                    </li>
                    <li className={classes.statItem}>
                        <svg width="25" height="25" viewBox="0 0 25 25" className="icon stat-view-icon"
                             data-v-71f2d09e="" data-v-bdf6e7fa="">
                            <g fill="none" fillRule="evenodd" data-v-71f2d09e="" data-v-bdf6e7fa="">
                                <circle cx="12.5" cy="12.5" r="12.5" fill="#E1EFFF" data-v-71f2d09e=""
                                        data-v-bdf6e7fa=""/>
                                <path fill="#7BB9FF"
                                      d="M4 12.5S6.917 7 12.75 7s8.75 5.5 8.75 5.5-2.917 5.5-8.75 5.5S4 12.5 4 12.5zm8.75 2.292c1.208 0 2.188-1.026 2.188-2.292 0-1.266-.98-2.292-2.188-2.292-1.208 0-2.188 1.026-2.188 2.292 0 1.266.98 2.292 2.188 2.292z"
                                      data-v-71f2d09e="" data-v-bdf6e7fa=""/>
                            </g>
                        </svg>
                        <div
                            className={classes.content}>文章被阅读 <span> {numFormat(props.BusinessCardData.got_view_count)}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </Fragment>
    )
}

export default BusinessCard
