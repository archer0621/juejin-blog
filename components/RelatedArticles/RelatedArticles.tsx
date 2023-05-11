import styles from './RelatedArticles.module.css'
import Link from 'next/link'

export interface articleArray {
    article: article[]
}

export interface article {
    id: String;
    attributes: { title: string }
}

const RelatedArticles = ({article}: articleArray) => {
    return (
        <div className={styles.block}>
            <div className={styles.block_title}>相关文章</div>
            <div className={styles.block_body}>
                <div className={styles.block_list}>
                    {article && article.map((item: any, index: number) => {
                        if (index < 10) {
                            return (<Link className={styles.item} href={`http://localhost:3000/article/${item.id}`}
                                          key={item.id}>
                                <div className={styles.entry_title}>{item.attributes.title}</div>
                            </Link>)
                        } else {
                            return
                        }
                    })}

                </div>
            </div>
        </div>
    )
}
export default RelatedArticles
