'use client'

type ButtonProps = {
  text: string
  url?: string
  callback?: (e: React.MouseEvent) => void
  textOnly?: boolean
  buttonType?: 'button' | 'submit' | 'reset'
  iconClass?: string
  imgUrl?: string
  secondary?: boolean
  tertiary?: boolean
  disabled?: boolean
  loading?: boolean
}

export default function Button(props: ButtonProps) {
  const { url, callback, text, iconClass, imgUrl, secondary, tertiary, textOnly, buttonType, disabled, loading } = props

  const handleClick = (ev: React.MouseEvent) => {
    if (url) {
      window.location.href = url
    } else if (callback) {
      callback(ev)
    }
  }

  const base =
    'font-noto bg-none border-none rounded-[5px] h-[55px] text-base text-left px-5 font-bold flex items-center mr-6 cursor-pointer w-full mb-4 text-white'
  const primary = 'bg-mcu-red/70 hover:bg-mcu-red/40'
  const secondaryClass = 'border-2 border-mcu-red/70 bg-transparent hover:border-mcu-red/40 justify-center'
  const tertiaryClass = 'bg-[#1a1a1a] hover:bg-[#292929]'
  const disabledClass = 'bg-mcu-red/10 text-white/10 cursor-not-allowed'
  const textOnlyClass = 'justify-around'

  const className = [
    base,
    secondary ? secondaryClass : tertiary ? tertiaryClass : primary,
    textOnly ? textOnlyClass : '',
    disabled || loading ? disabledClass : '',
  ]
    .join(' ')
    .trim()

  return (
    <button
      disabled={disabled || loading}
      type={buttonType}
      onClick={handleClick}
      className={className}
    >
      {iconClass && (
        <span className="border border-white/70 inline-block w-[25px] h-[25px] rounded-full text-center">
          <i className={iconClass}></i>
        </span>
      )}
      {imgUrl && (
        <span>
          <img className="w-10 h-10 rounded-full mt-[5px]" src={imgUrl} alt={text} />
        </span>
      )}
      <span className={iconClass || imgUrl ? 'ml-2.5' : ''}>{text}</span>
    </button>
  )
}
