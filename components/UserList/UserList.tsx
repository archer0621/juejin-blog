import Link from "next/link"
import style from "./UserList.module.scss"
import {NextPage} from "next"
import Image from "next/image"
import {SERVERDOMAIN} from "@/utils"

export interface UserListItemProp {
    id: number
    attributes: {
        title: string
        description: string
        createdAt: Date
        updatedAt: Date
        publishedAt: Date
        level: number
        image: any
    }
}

export interface UserListProp {
    UserListData: UserListItemProp
}

const UserList: NextPage<UserListProp> = ({UserListData}) => {
    return (
        <div className={style["container"]}>
            <header className={style["user-block-header"]}>🎖️作者榜</header>
            <div>
                {Object.values(UserListData).map((user) => {
                    return (
                        <div key={user.id} className={style["user-item"]}>
                            <div className={style["link"]}>
                                 {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={`${SERVERDOMAIN}${user.attributes.image.data[0].attributes.url}`}
                                    className={style["avatar"]}
                                    alt="作者头像"
                                    width={500}
                                    height={500}
                                />
                                <div className={style["user-info"]}>
                                    <Link href="/404">
                                    </Link>
                                    <div className={style["description"]}>
                                        {user.attributes.description}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <footer className={style["user-more"]}>完整榜单 {">"}</footer>
        </div>
    )
}

export default UserList
