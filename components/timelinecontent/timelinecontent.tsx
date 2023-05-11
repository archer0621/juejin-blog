import Styles from "../timelinecontent/timelinecontent.module.css"

function Timelinecontent({children}): JSX.Element {
    return <div className={Styles.timelinecontent}>{children}</div>
}

export default Timelinecontent
