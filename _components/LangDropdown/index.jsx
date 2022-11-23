import { langs } from "config";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import classes from "./style.module.scss";

function LangDropdown() {
  const dropdownRef = useRef();

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const event = (e) => {
      if (!dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("click", event);
    }

    return () => {
      document.removeEventListener("click", event);
    };
  }, [isOpen]);

  return (
    <div className={classes.langDropdown}>
      <p ref={dropdownRef} className={classes.selected} onClick={() => setIsOpen((prev) => !prev)}>
        {router.locale} <img className={classes.arrowIcon} src="/icons/arrow.svg" alt="" />
      </p>
      <ul className={`${classes.list} ${isOpen ? classes.open : ""}`}>
        {langs.map((lang) => (
          <li key={lang} className={`${classes.item} ${router.locale == lang ? classes.selected : ""}`}>
            <Link className={classes.itemContent} href={router.asPath} locale={lang}>
              {lang}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LangDropdown;
