import { Text } from '../Text'
import styles from './Footer.module.css'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Text color="accents-7" className={styles.text}>
                © 2023 SellBuyPlay. All Rights Reserved
            </Text>
        </footer>
    )
}

export default Footer
