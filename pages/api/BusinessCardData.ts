import type {NextApiRequest, NextApiResponse} from 'next'
import axios from "axios";
import {SERVERDOMAIN} from "@/utils";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const authorId = req.query.articleId;
    axios.get(`${SERVERDOMAIN}/api/author-infos/${authorId}`).then((result) => {
        const data = result.data || {};
        res.status(200).json(
            data.data.attributes
        );
    });
}
