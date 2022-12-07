import { useEffect, useRef, useState } from "react";
import classes from "./style.module.scss";
import useTheme from "contexts/ThemeContext";
import useTranslation from "contexts/translationContext";
import ThemeAutoIcon from "_icons/ThemeAutoIcon";
import ThemeLightIcon from "_icons/ThemeLightIcon";
import ThemeDarkIcon from "_icons/ThemeDarkIcon";

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
        {themeMode == "auto" &&  <ThemeAutoIcon className={classes.themeIcon} />  }
        {themeMode == "light" &&  <ThemeLightIcon className={classes.themeIcon} />  }
        {themeMode == "dark" &&  <ThemeDarkIcon className={classes.themeIcon} />  }
 
        {t("theme")}
      </div>

      {isOpen && (
        <ul className={classes.themeList}>
          <li
            className={`${classes.themeListItem} ${themeMode == "auto" ? classes.selected : ""}`}
            onClick={() => setTheme("auto")}
          >
            <ThemeAutoIcon className={classes.themeIcon} /> {t("auto")}
          </li>
          <li
            className={`${classes.themeListItem} ${themeMode == "light" ? classes.selected : ""}`}
            onClick={() => setTheme("light")}
          >
            <ThemeLightIcon className={classes.themeIcon} /> {t("light")}
          </li>
          <li
            className={`${classes.themeListItem} ${themeMode == "dark" ? classes.selected : ""}`}
            onClick={() => setTheme("dark")}
          >
            <ThemeDarkIcon className={classes.themeIcon} /> {t("dark")}
          </li>
        </ul>
      )}
    </div>
  );
}

export default ThemeDropdown;
