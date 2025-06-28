import { images } from './images'

export function LoadSpinner() {
  return (
    <img
      className="w-[50px] h-[50px] opacity-30 animate-spin"
      src={images.ball}
    />
  )
}
