import { useState, useEffect } from 'react'

import { tgSendInitData } from './tgUtils'

import { AppContainer } from './AppContainer'
import { Menu } from './Menu'

import { AuthLoader } from './AuthLoader'
import { RegistrationRequest } from './RegistrationRequest'
import { WaitingApproveMsg } from './WaitingApproveMsg'

import { pages, contentPages } from './pages'

function App() {
  const [selectedPageCode, setSelectedPageCode] = useState(contentPages[0])
  const [appInitialized, setAppInitialized] = useState(false)

  let ContentElement = pages[selectedPageCode].content

  if (!window.tgIsAuth) {
    ContentElement = AuthLoader
  }

  if (window.isUserRegisteredFetched) {
    if (window.isUserRegistered && !window.isUserApproved) {
      ContentElement = WaitingApproveMsg
    }

    if (!window.isUserRegistered) {
      ContentElement = RegistrationRequest
    }
  }

  useEffect(() => {
    const doInit = async () => {
      const initResult = await tgSendInitData()
      setAppInitialized(initResult)
    }

    doInit()
  }, [])

  return (
    <AppContainer>
      <ContentElement />

      {![AuthLoader, WaitingApproveMsg, RegistrationRequest].includes(
        ContentElement
      ) && (
        <Menu
          selectedPageCode={selectedPageCode}
          pageCodes={contentPages}
          onPageCodeSelect={(pageCode) => setSelectedPageCode(pageCode)}
        />
      )}
    </AppContainer>
  )
}

export default App
