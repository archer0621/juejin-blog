import { ExtendContext } from "@/stores/expend"
import { NextPage } from "next"
import { useContext } from "react"
import style from "./ArticleNavBar.module.scss"
import ArticleNavBarItem from "./ArticleNavBarItem"

export interface IArticleNavBarProp {
  navList: smallNavBarList
  isCard: boolean
}

export interface smallNavBarLItemProp {
  id: string|number
  attributes: {
    title: string
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
  [propName: string]: any;
}

export interface smallNavBarList {
  id: number|string
  attributes: {
    title: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    labels: {
      data: Array<smallNavBarLItemProp>
    }
    articles: Object
  }
}

const ArticleNavBar: NextPage<IArticleNavBarProp> = ({ navList, isCard }) => {
  let { isExtend, setExtend, setActive } = useContext(ExtendContext)

  let navListData = navList.attributes.labels.data as smallNavBarLItemProp[]
  let bigNavId = navList.id

  let tagList = navListData.map((v) => {
    return {
      id: "_" + v.id,
      attributes: v.attributes,
      activeId: `${bigNavId}_${v.id}`
    }
  })
  if (!isCard) {
    tagList.unshift({
      id: "_0",
      attributes: {
        title: "全部",
        createdAt: "",
        updatedAt: "",
        publishedAt: ""
      },
      activeId: "_0"
    })
  }

  const filterNavList = navListData.slice(0, 9)
  filterNavList.unshift({
    id: "_0",
    attributes: {
      title: "全部",
      createdAt: "",
      updatedAt: "",
      publishedAt: ""
    },
    activeId: "_0"
  })
  filterNavList.push({
    id: 3333,
    attributes: {
      title: "展开",
      createdAt: "1",
      updatedAt: "",
      publishedAt: ""
    }
  })
  let newNavList: any = filterNavList

  function showRawData() {
    // 展开
    if (!isExtend) {
      setExtend(true)
      setActive("_0")
    }
  }

  if (isExtend || isCard) {
    return (
      <div className={style["nav-list"]}>
        {tagList.map((navitem) => (
          <ArticleNavBarItem
            key={navitem.id}
            navItemData={navitem}
            extend={showRawData}
            isCard={isCard}
            bigNavId={bigNavId}
          >
            {navitem.attributes.title}
          </ArticleNavBarItem>
        ))}
      </div>
    )
  }
  return (
    <div className={style["nav-list"]}>
      {newNavList.map((navitem) => (
        <ArticleNavBarItem
          key={navitem.id}
          navItemData={navitem}
          bigNavId={bigNavId}
          extend={showRawData}
          isCard={isCard}
        >
          {navitem.attributes.title === "展开" ? (
            <span className={style["triangle"]}>
              {navitem.attributes.title}
            </span>
          ) : (
            navitem.attributes.title
          )}
        </ArticleNavBarItem>
      ))}
    </div>
  )
}

export default ArticleNavBar
