import React from "react";
import "./styles.scss";

import { VisibilityContext } from "react-horizontal-scrolling-menu";

// Arrows are only useful when there is more in the row than fits.
const useHasOverflow = () => {
  const { scrollContainer, items } = React.useContext(VisibilityContext);
  const [hasOverflow, setHasOverflow] = React.useState(false);

  React.useEffect(() => {
    const container = scrollContainer.current;
    if (!container) return;

    const check = () => setHasOverflow(container.scrollWidth > container.clientWidth);
    check();

    const observer = new ResizeObserver(check);
    observer.observe(container);
    return () => observer.disconnect();
  }, [scrollContainer, items]);

  return hasOverflow;
}

export const LeftArrow = () => {
  const visibility = React.useContext(VisibilityContext);
  const { scrollToItem, scrollPrev, getItemElementById, items, useIsVisible } =
  visibility;
  const isFirstItemVisible = useIsVisible("first", true);
  const hasOverflow = useHasOverflow();

  if (!hasOverflow) return null;

  return (
    <Arrow
      label="Scroll left"
      onClick={() => {
        if (isFirstItemVisible) {
          scrollToItem(getItemElementById(items.toArr().slice(-1)?.[0]?.[0])!);
        } else {
          scrollPrev();
        }
      }}
    >
      <i className="fa-solid fa-chevron-left"></i>
    </Arrow>
  );
}

export const RightArrow = () => {
  const { getItemElementById, items, scrollNext, scrollToItem, useIsVisible } =
    React.useContext(VisibilityContext);
  const isLastItemVisible = useIsVisible("last", true);
  const hasOverflow = useHasOverflow();

  if (!hasOverflow) return null;

  return (
    <Arrow
      label="Scroll right"
      onClick={() => {
        if (isLastItemVisible) {
          scrollToItem(getItemElementById(items.toArr()?.[0]?.[0])!);
        } else {
          scrollNext();
        }
      }}
    >
      <i className="fa-solid fa-chevron-right"></i>
    </Arrow>
  );
}

function Arrow({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: VoidFunction;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="carousel-arrow"
    >
      {children}
    </button>
  );
}
