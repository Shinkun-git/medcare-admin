import styles from "./InputField.module.css";
import Image from "next/image";
import { Montserrat } from "next/font/google";

const MontserratFont = Montserrat({
  subsets: [],
  weight: "500",
});

const InputField = ({
  inputLabel,
  vectorURL,
  placeholder,
  type,
  name,
  value,
  onChange,
}: {
  inputLabel: string;
  vectorURL: string;
  placeholder: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <label htmlFor={name} className={MontserratFont.className}>
      <section className={styles.outerFrame}>
        {inputLabel}
        <div className={styles.innerFrame}>
          <div className={styles.mainFrame}>
            <section>
              <Image
                src={vectorURL}
                alt={`${inputLabel} icon`}
                width={15}
                height={15}
                style={{ left: "3px", top: "3px", position: "relative" }}
              />
            </section>
            <input
              className={styles.input}
              type={type} // ✅ Fixed type
              name={name} // ✅ Fix: Pass correct name
              id={name}
              placeholder={placeholder}
              value={value} // ✅ Fix: Controlled component
              onChange={onChange} // ✅ Fix: Update form state
            />
          </div>
        </div>
      </section>
    </label>
  );
};

export default InputField;
