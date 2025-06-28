import { useState } from 'react'

const tg = window.Telegram.WebApp
const isTg = tg.initData != ''

let tgTheme = 'light'

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

  tgTheme = tg.colorScheme

  tgColorClasses = {
    bg: 'bg-[var(--tg-theme-bg-color)]',
    txt: 'text-[var(--tg-theme-text-color)]',
    btnTxt: 'text-[var(--tg-theme-button-text-color)]',
    btnBg: 'bg-[var(--tg-theme-button-color)]',
    hint: 'text-[var(--tg-theme-hint-color)]',
    link: 'text-[var(--tg-theme-link-color)]',
  }
}

const useTgAuth = () => {
  const [isTgAuth, setTgIsAuth] = useState(false)

  const tgSendInitData = async () => {
    if (!isTg) {
      return
    }

    const url = '/che_team/auth.php'
    const method = 'POST'
    const body = new FormData()
    body.append('init_data', tg.initData)
    const resp = await fetch(url, { method, body })
    const data = await resp.json()

    setTgIsAuth(data.is_valid)
  }

  return { isTgAuth, tgSendInitData }
}

export { tg, isTg, tgUser, tgColorClasses, useTgAuth, tgTheme }
