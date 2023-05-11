import type {NextApiRequest, NextApiResponse} from 'next';
import axios from 'axios';
import {SERVERDOMAIN} from '@/utils';


export interface IArticleProps {
    title: string;
    AuthorName: string;
    description: string;
    createdAt: string;
    image: any;
    AuthorImage: string,
    article_detail: any,
    img: string
}

const getArticleInfoData = (req: NextApiRequest, res: NextApiResponse<IArticleProps>): void => {
    const {articleId} = req.query;
    axios.get(`${SERVERDOMAIN}/api/articles/${articleId}?populate=*`).then((result) => {
        const data = result.data || {};
        res.status(200).json(
            data.data.attributes
        );
    });
};

export default getArticleInfoData;
