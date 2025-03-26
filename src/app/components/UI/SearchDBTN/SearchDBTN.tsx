import { Montserrat } from "next/font/google";
import styles from "./SearchDBTN.module.css";

const MontserratFont = Montserrat({
  subsets: [],
  weight: "500",
});

const SearchDBTN = ({ text, bgColor, type, onClick }: { text: string; bgColor: string; type?: "button" | "submit" | "reset"; onClick?: () => void }) => {
  return (
    <button className={`${styles.button} ${MontserratFont.className}`} style={{ background: bgColor }} type={type} onClick={onClick}>
      {text}
    </button>
  );
};

export default SearchDBTN;
