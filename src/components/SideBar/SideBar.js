import styles from './SideBar.module.css'
import { firstLetterUppercase } from '../../util/stringHelper'
import { useRouter } from 'next/router'

const SideBar = () => {
    const router = useRouter()
    return (
        <div className={styles.root}>
            <nav className={styles.navbar}>
                <div className={styles.menu}>
                    {['claim', 'wallet', 'nft', 'withdraw', 'buy', 'exchange'].map((item) => {
                        return (
                            <li
                                className={
                                    router.pathname === `/${item}` ? styles.isActive : styles.li
                                }
                                key={item}
                                onClick={() => router.push(`/${item}`)}
                            >
                                {firstLetterUppercase(item)}
                            </li>
                        )
                    })}
                </div>
            </nav>
        </div>
    )
}
export default SideBar
