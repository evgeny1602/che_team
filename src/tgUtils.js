const mockTg = true
// const mockTg = false

const blankTgUser = {
  id: null,
  isBot: false,
  first_name: null,
  last_name: null,
  username: null,
  language_code: null,
  allows_write_to_pm: false,
  photo_url: null,
}

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

const blankTgColorClasses = {
  bg: 'bg-white',
  txt: 'text-black',
  btnTxt: 'text-white',
  btnBg: 'bg-[#40a7e3]',
  hint: 'text-[#999999]',
  link: 'text-[#168dcd]',
  border: 'border-black',
}

const realTgColorClasses = {
  bg: 'bg-[var(--tg-theme-bg-color)]',
  txt: 'text-[var(--tg-theme-text-color)]',
  btnTxt: 'text-[var(--tg-theme-button-text-color)]',
  btnBg: 'bg-[var(--tg-theme-button-color)]',
  hint: 'text-[var(--tg-theme-hint-color)]',
  link: 'text-[var(--tg-theme-link-color)]',
  border: 'border-[var(--tg-theme-text-color)]',
}

const tg = window.Telegram.WebApp
const isTg = mockTg ? true : tg.initData != ''

let tgUser = mockTg ? mockTgUser : blankTgUser
let tgTheme = 'light'
let tgColorClasses = blankTgColorClasses

if (isTg && !mockTg) {
  tgUser = tg.initDataUnsafe.user
  tgTheme = tg.colorScheme
  tgColorClasses = realTgColorClasses

  tg.disableVerticalSwipes()
  tg.lockOrientation()
  tg.expand()
}

const fetchAuthData = async (initData) => {
  const body = new FormData()

  body.append('init_data', initData)

  const resp = await fetch('/che_team/auth.php', { method: 'POST', body })
  const data = await resp.json()

  if (!data) {
    return false
  }

  if (!('is_valid' in data)) {
    return false
  }

  return data.is_valid
}

const tgSendInitData = async () => {
  if (mockTg) {
    window.tgIsAuth = true
    window.isUserApproved = true
    window.isUserRegistered = true
    window.isAdmin = true
    window.userId = 22
    return
  }

  if (!isTg) {
    return
  }

  window.tgIsAuth = await fetchAuthData(tg.initData)

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
    window.userId = parseInt(users[0].id)

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

export { tg, isTg, tgUser, tgColorClasses, tgTheme, tgSendInitData }
