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
            <div className={styles.HeadLink}>
                <NavHead />
                <NavLinks />
            </div>
            <NavButtons />
        </nav>
    )
} 