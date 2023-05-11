import {NextPage} from "next"
import {GetServerSideProps} from "next"
import {SERVERDOMAIN, getDiffTime, LOCALDOMAIN} from "@/utils"
import Navbarview, {navBarViewData} from "@/components/navbar-view"
import MainContent from "@/components/maincontent/maincontent"
import TimeLineContent from "@/components/timelinecontent/timelinecontent"
import Timeline_entrylist, {
    DataAd
} from "@/components/timeline_entrylist/timeline_entrylist"
import Advertisement, {
    AdvertisementItemProps
} from "@/components/Advertisement/Advertisement"
import UserList, {UserListItemProp} from "@/components/UserList/UserList"


import style from "./index.module.scss"
import axios from "axios"

import {ExtendContextProvider} from "@/stores/expend"

export interface IProps {
    data_nav: navBarViewData
    data_tab: navBarViewData
    data_article: DataAd
    data_latest: DataAd
    data_hot: DataAd
    AdvertisementData: AdvertisementItemProps
    UserListData: UserListItemProp
    IsFixed: boolean
    handlerLoading: () => void
    currentTitle?: string
}

const Home: NextPage<IProps> = ({
                                    data_nav,
                                    data_tab,
                                    AdvertisementData,
                                    UserListData,
                                    data_article,
                                    data_latest,
                                    data_hot,
                                    IsFixed,
                                    handlerLoading
                                }) => {
    return (
        <MainContent>
            <>
                <ExtendContextProvider>
                    <Navbarview dataNav={data_nav} IsFixed={IsFixed}/>
                </ExtendContextProvider>
                <TimeLineContent>
                    <Timeline_entrylist
                        dataTab={data_tab}
                        data_article={data_article}
                        data_latest={data_latest}
                        data_hot={data_hot}
                        handlerLoading={handlerLoading}
                    />
                    {/*<Sidebar>*/}
                    {/*</Sidebar>*/}
                    <aside className={style["aside"]}>
                        <Advertisement AdvertisementData={AdvertisementData}/>
                        <UserList UserListData={UserListData}/>
                    </aside>
                </TimeLineContent>
            </>
        </MainContent>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const {
        tab: res_tab,
        navbarview: res_nav,
        article: res_article,
        article_latest: res_latestarticle,
        article_hot: res_hotarticle,
        res_advertisement: res_advertisement,
        res_userlist: res_userlist
    } = (await axios.get(`${LOCALDOMAIN}/api/home`)).data.data
    for (let i = 0; i < res_article.length; i++) {
        res_article[i].attributes.date = getDiffTime(res_article[i].attributes.updatedAt)
        res_latestarticle[i].attributes.date = getDiffTime(res_latestarticle[i].attributes.updatedAt)
        res_hotarticle[i].attributes.date = getDiffTime(res_hotarticle[i].attributes.updatedAt)
    }

    return {
        props: {
            data_tab: res_tab,
            data_nav: res_nav,
            AdvertisementData: res_advertisement,
            UserListData: res_userlist,
            data_article: res_article,
            data_latest: res_latestarticle,
            data_hot: res_hotarticle
        }
    }
}
export default Home
