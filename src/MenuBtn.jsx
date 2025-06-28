import { images, selectedImages } from './images'

export function MenuBtn({ icon, onClick, isSelected }) {
  return (
    <div
      className={`transition-colors duration-300 flex flex-col flex-nowrap justify-center items-center h-full border-t-4 ${
        isSelected
          ? 'border-[#df530e]'
          : 'border-transparent cursor-pointer hover:opacity-60 transition-opacity duration-300'
      }`}
    >
      <img
        src={isSelected ? selectedImages[icon] : images[icon]}
        className={`w-[35px] h-[35px] min-w-[35px] min-h-[35px] opacity-80`}
        onClick={onClick}
      />
    </div>
  )
}
