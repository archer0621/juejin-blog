import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";
import {SERVERDOMAIN} from "@/utils";


const getNavData = (req: NextApiRequest, res: NextApiResponse): void => {
    const bigNav = req.query.bigNav;
    axios.get(`${SERVERDOMAIN}/api/article-tabs`).then((tab) => {
            axios.get(`${SERVERDOMAIN}/api/article-type-tabs`).then((navBarView) => {
                axios.get(`${SERVERDOMAIN}/api/articles?populate=image,article_type_tabs,tags&filters[article_type_tabs][id]=${bigNav}`).then((article) => {
                    axios.get(`${SERVERDOMAIN}/api/articles?filters[article_type_tabs][id]=${bigNav}&sort[0]=updatedAt:desc&populate=image,article_type_tabs,tags`).then((article_latest) => {
                        axios.get(`${SERVERDOMAIN}/api/articles?filters[article_type_tabs][id]=${bigNav}&sort[0]=view_count:desc&populate=image,article_type_tabs,tags`).then((article_hot) => {
                            axios.get(`${SERVERDOMAIN}/api/advertisements?populate=deep`).then(res_advertisement => {
                                axios.get(`${SERVERDOMAIN}/api/author-lists?populate=deep`).then(res_userlist => {
                                    const data = {
                                        tab: tab.data.data,
                                        navbarview: navBarView.data.data,
                                        article: article.data.data,
                                        article_latest: article_latest.data.data,
                                        article_hot: article_hot.data.data,
                                        res_advertisement: res_advertisement.data.data,
                                        res_userlist: res_userlist.data.data
                                    }
                                    res.status(200).json({
                                        data: data
                                    })
                                })
                            })
                        })
                    })
                })
            })
        }
    )
}
export default getNavData;
