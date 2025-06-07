const tg = window.Telegram.WebApp
const isTg = tg.initData != ''

let tgUser = {
  id: null,
  isBot: false,
  first_name: null,
  last_name: null,
  username: null,
  language_code: null,
  allows_write_to_pm: false,
  photo_url: null,
}

let tgColorClasses = {
  bg: 'bg-white',
  txt: 'text-black',
  btnTxt: 'text-white',
  btnBg: 'bg-[#40a7e3]',
  hint: 'text-[#999999]',
  link: 'text-[#168dcd]',
}

if (isTg) {
  tgUser = tg.initDataUnsafe.user

  tgColorClasses = {
    bg: 'bg-[var(--tg-theme-bg-color)]',
    txt: 'text-[var(--tg-theme-text-color)]',
    btnTxt: 'text-[var(--tg-theme-button-text-color)]',
    btnBg: 'bg-[var(--tg-theme-button-color)]',
    hint: 'text-[var(--tg-theme-hint-color)]',
    link: 'text-[var(--tg-theme-link-color)]',
  }
}

export { tg, isTg, tgUser, tgColorClasses }
