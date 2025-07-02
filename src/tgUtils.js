import { useState, useEffect } from 'react'

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
  border: 'border-black',
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
    border: 'border-[var(--tg-theme-text-color)]',
  }
}

const useTg = () => {
  const [isTgAuth, setTgIsAuth] = useState(false)
  const [isUserRegistered, setIsUserRegistered] = useState(false)
  const [isUserRegisteredFetched, setIsUserRegisteredFetched] = useState(false)
  const [isUserApproved, setIsUserApproved] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

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

  const fetchIsUserRegistered = async () => {
    if (!isTgAuth) {
      return
    }

    const resp = await fetch(`/che_team/api/users/tg/${tgUser.id}`)
    const { users } = await resp.json()

    setIsUserRegisteredFetched(true)

    if (users.length > 0) {
      if (users[0].is_approved == '1') {
        setIsUserApproved(true)
      }

      if (users[0].is_admin == '1') {
        setIsAdmin(true)
      }

      setIsUserRegistered(true)
    } else {
      setIsUserRegistered(false)
    }
  }

  useEffect(() => {
    tgSendInitData()
  }, [])

  useEffect(() => {
    fetchIsUserRegistered()
  }, [isTgAuth])

  return {
    isTgAuth,
    isUserRegistered,
    isUserRegisteredFetched,
    isUserApproved,
    isAdmin,
  }
}

const initTgApp = () => {
  tg.disableVerticalSwipes()
  tg.lockOrientation()
  tg.expand()
  if (tg.platform != 'tdesktop') {
    tg.requestFullscreen()
  }
}

const isMobile = ['android'].includes(tg.platform)

if (isTg) {
  initTgApp()
}

export { tg, isTg, tgUser, tgColorClasses, useTg, tgTheme, isMobile, initTgApp }
