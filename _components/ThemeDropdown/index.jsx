import { useEffect, useRef, useState } from "react";
import classes from "./style.module.scss";
import useTheme from "contexts/ThemeContext";
import useTranslation from "contexts/translationContext";

function ThemeDropdown() {

  const t = useTranslation();
  const themeDropdownRef = useRef();

  const { theme, themeMode, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState("");

  useEffect(() => {
    const event = (e) => {
      if (!themeDropdownRef.current.contains(e.target)) {
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
    <div className={classes.themeDropdown} ref={themeDropdownRef} onClick={() => setIsOpen((prev) => !prev)}>
      <div className={classes.themeLabel}>
        <img className={classes.themeIcon} src={`/icons/${themeMode}.svg`} alt="" />
        {t("theme")}
 
      </div>

      {isOpen && (
        <ul className={classes.themeList}>
          <li
            className={`${classes.themeListItem} ${themeMode == "auto" ? classes.selected : ""}`}
            onClick={() => setTheme("auto")}
          >
            <img className={classes.themeIcon} src="/icons/auto.svg" alt="" /> {t("auto")}
          </li>
          <li
            className={`${classes.themeListItem} ${themeMode == "light" ? classes.selected : ""}`}
            onClick={() => setTheme("light")}
          >
            <img className={classes.themeIcon} src="/icons/light.svg" alt="" /> {t("light")}
          </li>
          <li
            className={`${classes.themeListItem} ${themeMode == "dark" ? classes.selected : ""}`}
            onClick={() => setTheme("dark")}
          >
            <img className={classes.themeIcon} src="/icons/dark.svg" alt="" /> {t("dark")}
          </li>
        </ul>
      )}
    </div>
  );
}

export default ThemeDropdown;
