import styles from './DashBoard.module.css'
import SideBar from './SideBar'

const SideBarPage = ({ children }) => {
    return (
        <div className={styles.root}>
            <SideBar />
            <div className={styles.sub_children}>{children}</div>
        </div>
    )
}
export default SideBarPage
