import styles from "./Navbar.module.css"
import { Montserrat } from "next/font/google";
import NavLinks from "../../UI/NavLinks/NavLinks";
import NavButtons from "../../UI/NavButtons/NavButtons";
import NavHead from "../../UI/NavHead/NavHead";

const MontserratFont = Montserrat({
    subsets: [],
    weight: "500"
})

export default function Navbar() {
    return (
        <nav className={`${styles.container} ${MontserratFont.className}`}>
            <input type="checkbox" id="toggle" className={styles.toggleInput} />
            <label htmlFor="toggle" className={styles.menuBtn}>
                <img src="/menu-white.svg" height={32} width={32} alt="menu" />
            </label>

            <div className={styles.linkContainer}>
                <label htmlFor="toggle" className={styles.closeBtn}>
                    <img src="/cross.svg" height={32} width={32} alt="close" />
                </label>
                <div className={styles.HeadLink}>
                    <NavHead />
                    <NavLinks />
                </div>
                <NavButtons />
            </div>
        </nav>
    )
} 