import {NextPage} from "next"
import {GetServerSideProps} from "next"
import {getDiffTime, LOCALDOMAIN} from "@/utils"
import axios from "axios"
import Home from "../index"
import {IProps} from "@/pages"
import React from "react"

const TagPage: NextPage<IProps> = ({
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
    return <Home
        data_nav={data_nav}
        data_tab={data_tab}
        AdvertisementData={AdvertisementData}
        UserListData={UserListData}
        data_article={data_article}
        data_latest={data_latest}
        data_hot={data_hot}
        IsFixed={IsFixed}
        handlerLoading={handlerLoading}
    ></Home>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const bigNav = context.query.Bignav
    const smallNav = (context.query.SmallNav as string).replace('_', '') //添加类型断言
    const {
        tab: res_tab,
        navbarview: res_nav,
        article: res_article,
        article_latest: res_latestarticle,
        article_hot: res_hotarticle,
        res_advertisement: res_advertisement,
        res_userlist: res_userlist
    } = (await axios.get(`${LOCALDOMAIN}/api/smallNavData`, {
        params: {
            bigNav,
            smallNav
        }
    })).data.data
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

export default TagPage
