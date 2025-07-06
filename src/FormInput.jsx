import { tgColorClasses } from './tgUtils'

export function FormInput({
  type,
  value,
  onChange,
  placeholder = '',
  label = null,
}) {
  return (
    <div className="flex flex-col flex-nowrap w-full">
      {label && <div className="opacity-60 text-center">{label}</div>}

      <input
        className={`w-full rounded-4xl border-1 ${tgColorClasses.border} p-3 text-center`}
        type={type}
        value={value}
        onChange={(e) => onChange(e)}
        placeholder={placeholder}
      />
    </div>
  )
}
