import Styles from "./navbar.module.css"
import React, { FC, useContext, useEffect, useRef, useState } from "react"
import ArticleNavBar from "../ArticleNavBar/ArticleNavBar"
import { SERVERDOMAIN, throttle } from "@/utils"
import { useRouter } from "next/router"
import axios from "axios"
import { ExtendContext } from "@/stores/expend"
import Head from "next/head"
export interface navBarViewData {
  id: number
  attributes: {
    title: string
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
}

export interface navBarViewProps {
  dataNav: navBarViewData
  IsFixed?: boolean
}

export const Navbarview: FC<navBarViewProps> = ({ dataNav, IsFixed }) => {
  let cardRef: any = useRef()
  let smallNavBarRef: any = useRef()
  let [activeIndex, setActiveIndex] = useState(1)
  let [navList, setNavList] = useState()
  let [navList2, setNavList2] = useState()
  let [mouseEnterIndex, setMouseEnterIndex] = useState(0)
  let route = useRouter()
  let { active, setActive, setExtend } = useContext(ExtendContext)
  const bigNav = route.query.Bignav
  let smallnav: any = route.query.SmallNav
  const [currentTitle, setcurrentTitle] = useState("J-Blog")
  if (smallnav != undefined) {
    smallnav = smallnav.replace("_", "")
  }

  let isKeep = false

  // 获取小标签数据
  async function getSmallNavData(id, type) {
    let { data: res } = await axios.get(
      `${SERVERDOMAIN}/api/article-type-tabs/${id}?populate=*`
    )
    if (type === "click") {
      setNavList2(res.data)
      setcurrentTitle(res.data.attributes.title)
    } else if (type === "mouse") {
      setNavList(res.data)
    }
  }

  // 为大标签添加active样式
  function addActive(id) {
    if (id === 1 || id === 2) {
      smallNavBarRef.current.style.display = "none"
      if (id == 2) {
        route.push("/").catch((err) => {})
      }
    } else {
      route
        .push({
          pathname: "/[bigid]",
          query: { bigid: id }
        })
        .catch((err) => {})
    }

    setActiveIndex(id)
    setActive("_0")
    // route.replace({pathname: "/[bigid]", query: {bigid: id}})
    // 修改ArticleNavBar数据
  }

  // 显示card类型的元素
  function showArticleNavBar(id, e) {
    // 获取经过的id，让点击小标签时可以绑定active
    setMouseEnterIndex(id)

    if (id !== 1 && id !== 2) {
      getSmallNavData(id, "mouse")
      cardRef.current.style.display = "block"
      cardRef.current.style.left = `${e.relatedTarget.offsetLeft}px`
    }
  }

  // 关闭card
  function closeArticleNavBar() {
    setTimeout(() => {
      if (!isKeep) {
        cardRef.current.style.display = "none"
      }
    }, 100)
  }

  // 关闭card
  function closeShow() {
    isKeep = false
    cardRef.current.style.display = "none"
  }

  // 通过事件冒泡的机制方式来获取到小标签的点击
  function maopao() {
    if (mouseEnterIndex == 1) {
      route.push("/").catch((err) => {})
    }

    // 将此大标签设为active
    setActiveIndex(mouseEnterIndex)

    // 将下方小标签列表显示
    //smallNavBarRef.current.style.display = "block"
  }

  useEffect(() => {
    let smallNavBarRef: any = document.querySelector("#smallNavBar")

    if (bigNav == undefined) {
      setcurrentTitle("J-Blog")
    }else{
      setcurrentTitle(dataNav[Number(bigNav)-1].attributes.title)
    }
    if (bigNav && smallnav) {
      setExtend(true)
      getSmallNavData(bigNav, "click")
      smallNavBarRef.style.display = "block"
      setActiveIndex(bigNav as any)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bigNav, setExtend, smallnav])

  return (
    <div>
      <Head>
        <title>{currentTitle + "- 掘金"}</title>
      </Head>
      <div className={`${Styles.view_nav} ${IsFixed ? Styles.fixed : ""}`}>
        <div className={Styles.nav_list}>
          {Object.values(dataNav).map((post: navBarViewData) => (
            <div
              key={post.id}
              className={`{
         ${Styles.nav_item} 
         ${
           post.id == Number(bigNav) || (bigNav == undefined && post.id == 1)
             ? Styles.active
             : null
         }
        }`}
              onClick={maopao}
            >
              <div
                className={Styles.category_popover_box}
                onClick={addActive.bind(this, post.id)}
              >
                <span
                  onMouseEnter={throttle(
                    showArticleNavBar.bind(this, post.id),
                    200
                  )}
                  onMouseLeave={throttle(closeArticleNavBar.bind(this), 200)}
                >
                  {post.attributes.title}
                </span>
              </div>
              <div
                className={Styles.card}
                ref={cardRef}
                onMouseEnter={() => {
                  isKeep = true // 修改ArticleNavBar数据
                }}
                onMouseLeave={closeShow}
              >
                {!navList ? (
                  <span></span>
                ) : (
                  <ArticleNavBar
                    navList={navList}
                    isCard={true}
                  ></ArticleNavBar>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div ref={smallNavBarRef} className={Styles.smallNavBar} id="smallNavBar">
        {!navList2 ? (
          <span></span>
        ) : (
          <ArticleNavBar navList={navList2} isCard={false}></ArticleNavBar>
        )}
      </div>
    </div>
  )
}

export default Navbarview
