import classes from "./style.module.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import useTranslation from "contexts/translationContext";

function Slider({ title, children, seeAllLink = "" }) {
  const ref = useRef();
  const t = useTranslation();

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleArrowOnClick = useCallback((direction) => {
    let newPosition;
    let sign = 1;
    if (direction == "left") sign = -1;

    newPosition = ref.current.scrollLeft + ref.current.clientWidth * 0.8 * sign;
    ref.current.scrollTo({ left: newPosition, behavior: "smooth" });
  }, []);

  const scrollEvent = useCallback((e) => {
    if (e.target.scrollLeft == 0) setShowLeftArrow(false);
    else setShowLeftArrow(true);
    if (e.target.scrollLeft + e.target.clientWidth > e.target.scrollWidth - 1) setShowRightArrow(false);
    else setShowRightArrow(true);
  }, []);

  useEffect(() => {
    const sliderElement = ref.current;

    sliderElement.addEventListener("scroll", scrollEvent);

    return () => {
      sliderElement.removeEventListener("scroll", scrollEvent);
    };
  }, [scrollEvent]);

  return (
    <div className={classes.slider}>
      {title && (
        <div className={classes.sliderTitleWrapper}>
          <h4 className={classes.sliderTitle}>{title}</h4>
          {seeAllLink && (
            <Link className={classes.seeAllLink} href={seeAllLink}>
              {t("see_all").toCapitalCase()}
            </Link>
          )}
        </div>
      )}
      <div className={classes.sliderListWrapper}>
        {showLeftArrow && (
          <img
            className={`${classes.arrow} ${classes.left}`}
            onClick={() => handleArrowOnClick("left")}
            src="/icons/arrow.svg"
            alt=""
          />
        )}
        {showRightArrow && (
          <img
            className={`${classes.arrow} ${classes.right}`}
            onClick={() => handleArrowOnClick("right")}
            src="/icons/arrow.svg"
            alt=""
          />
        )}
        <div ref={ref} className={`${classes.sliderList} hideScrollbar`}>
          {children.map((child) => (
            <div key={child.key} className={classes.sliderItem}>
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slider;
