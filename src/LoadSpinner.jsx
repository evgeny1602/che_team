import { images, themedImages } from './images'

export function LoadSpinner({ size = 'base', theme = null }) {
  const sizeClass = {
    base: 'w-[50px] h-[50px]',
    small: 'w-[15px] h-[15px]',
  }[size]

  const imgSrc = theme !== null ? themedImages[theme].ball : images.ball

  return (
    <img
      className={`${sizeClass} opacity-30 animate-spin`}
      src={imgSrc}
    />
  )
}
