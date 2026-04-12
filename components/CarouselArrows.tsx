'use client'

import React from 'react'
import { VisibilityContext } from 'react-horizontal-scrolling-menu'

export function LeftArrow() {
  const { scrollToItem, scrollPrev, getItemElementById, items, useIsVisible } =
    React.useContext(VisibilityContext)
  const isFirstItemVisible = useIsVisible('first', true)

  return (
    <Arrow
      onClick={() => {
        if (isFirstItemVisible) {
          scrollToItem(getItemElementById(items.toArr().slice(-1)?.[0]?.[0])!)
        } else {
          scrollPrev()
        }
      }}
    >
      <i className="fa-solid fa-angles-left" />
    </Arrow>
  )
}

export function RightArrow() {
  const { getItemElementById, items, scrollNext, scrollToItem, useIsVisible } =
    React.useContext(VisibilityContext)
  const isLastItemVisible = useIsVisible('last', true)

  return (
    <Arrow
      onClick={() => {
        if (isLastItemVisible) {
          scrollToItem(getItemElementById(items.toArr()?.[0]?.[0])!)
        } else {
          scrollNext()
        }
      }}
    >
      <i className="fa-solid fa-angles-right" />
    </Arrow>
  )
}

function Arrow({ children, onClick }: { children: React.ReactNode; onClick: VoidFunction }) {
  return (
    <div onClick={onClick} className="carousel-arrow">
      {children}
    </div>
  )
}
