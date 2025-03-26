import styles from "./NavHead.module.css"
import Image from "next/image"
export default function NavHead() {
    return (
        <section className={styles.container}>
            <div className={styles.logoFrame}>
                <Image src="/medCareLogo.png" alt="medCare Logo" width={20} height={20}
                    className={styles.logo} />
            </div>
            <p className={styles.head}>MedCare</p>
        </section>
    )
}