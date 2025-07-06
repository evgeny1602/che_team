const mockTg = true
// const mockTg = false

const mockTgUser = {
  allows_write_to_pm: true,
  first_name: 'Evgeny',
  id: 450980607,
  language_code: 'ru',
  last_name: '',
  photo_url:
    'https://t.me/i/userpic/320/9yAlG4r7_30UQWSB-ks7Lo929kSPgx1qAbKF4Y0Qg2o.svg',
  username: 'evgeny1602',
}

const tg = window.Telegram.WebApp

let isTg = tg.initData != ''

if (mockTg) {
  isTg = true
}

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

if (mockTg) {
  tgUser = mockTgUser
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
  if (!mockTg) {
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
}

const tgSendInitData = async () => {
  if (mockTg) {
    window.tgIsAuth = true
    window.isUserApproved = true
    window.isUserRegistered = true
    window.isAdmin = true
    return
  }

  if (!isTg) {
    return
  }

  const body = new FormData()

  body.append('init_data', tg.initData)

  const resp = await fetch('/che_team/auth.php', { method: 'POST', body })
  const data = await resp.json()

  window.tgIsAuth = data.is_valid

  await fetchIsUserRegistered()

  return true
}

const fetchIsUserRegistered = async () => {
  if (!window.tgIsAuth) {
    return
  }

  const resp = await fetch(`/che_team/api/users/tg/${tgUser.id}`)
  const { users } = await resp.json()

  window.isUserRegisteredFetched = true

  if (users.length > 0) {
    window.userId = users[0].id

    if (users[0].is_approved == '1') {
      window.isUserApproved = true
    }

    if (users[0].is_admin == '1') {
      window.isAdmin = true
    }

    window.isUserRegistered = true
  } else {
    window.isUserRegistered = false
  }
}

const initTgApp = () => {
  if (mockTg) {
    return
  }

  tg.disableVerticalSwipes()
  tg.lockOrientation()
  tg.expand()
  // if (tg.platform != 'tdesktop') {
  //   tg.requestFullscreen()
  // }
}

const isMobile = ['android'].includes(tg.platform)

if (isTg) {
  initTgApp()
}

export {
  tg,
  isTg,
  tgUser,
  tgColorClasses,
  tgTheme,
  isMobile,
  initTgApp,
  tgSendInitData,
  fetchIsUserRegistered,
}
