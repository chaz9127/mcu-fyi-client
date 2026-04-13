"use client";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  text: string;
  url?: string;
  callback?: (e: React.MouseEvent) => void;
  textOnly?: boolean;
  buttonType?: "button" | "submit" | "reset";
  iconClass?: string;
  imgUrl?: string;
  secondary?: boolean;
  tertiary?: boolean;
  disabled?: boolean;
  loading?: boolean;
};

export default function Button(props: ButtonProps) {
  const {
    url,
    callback,
    text,
    iconClass,
    imgUrl,
    secondary,
    tertiary,
    textOnly,
    buttonType,
    disabled,
    loading,
  } = props;

  const handleClick = (ev: React.MouseEvent) => {
    if (url) {
      window.location.href = url;
    } else if (callback) {
      callback(ev);
    }
  };

  const base =
    "text-white font-noto bg-none rounded-[5px] h-[55px] text-base md:text-left text-center px-5 font-bold flex items-center cursor-pointer w-full mb-4";
  const primary = "bg-mcu-red hover:bg-mcu-red/70";
  const secondaryClass =
    "border-2 border-mcu-red/70 hover:border-mcu-red/40 justify-center text-mcu-text";
  const tertiaryClass = "bg-[#1a1a1a] hover:bg-[#292929]";
  const disabledClass = "bg-mcu-red/10/10 cursor-not-allowed";
  const textOnlyClass = "justify-around";

  const className = twMerge(
    clsx(
      base,
      secondary ? secondaryClass : tertiary ? tertiaryClass : primary,
      textOnly && textOnlyClass,
      (disabled || loading) && disabledClass
    )
  );

  return (
    <button
      disabled={disabled || loading}
      type={buttonType}
      onClick={handleClick}
      className={className}
    >
      {iconClass && (
        <span className="inline-block h-[25px] w-[25px] rounded-full border border-white/70 text-center">
          <i className={iconClass}></i>
        </span>
      )}
      {imgUrl && (
        <span>
          <img className="h-10 w-10 rounded-full" src={imgUrl} alt={text} />
        </span>
      )}
      <span className={iconClass || imgUrl ? "ml-2.5" : ""}>{text}</span>
    </button>
  );
}
