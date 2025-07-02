import { useState } from 'react'

import { useTg, isMobile } from './tgUtils'

import { AppContainer } from './AppContainer'
import { Menu } from './Menu'

import { AuthLoader } from './AuthLoader'
import { ContentFooter } from './ContentFooter'
import { ContentHeader } from './ContentHeader'
import { RegistrationRequest } from './RegistrationRequest'
import { WaitingApproveMsg } from './WaitingApproveMsg'

import { pages, contentPages } from './pages'

function App() {
  const [selectedPageCode, setSelectedPageCode] = useState(contentPages[0])

  const {
    isTgAuth,
    isUserRegistered,
    isUserRegisteredFetched,
    isUserApproved,
    isAdmin,
  } = useTg()

  let ContentElement = pages[selectedPageCode].content

  if (!isTgAuth) {
    ContentElement = AuthLoader
  }

  if (isUserRegisteredFetched) {
    if (isUserRegistered && !isUserApproved) {
      ContentElement = WaitingApproveMsg
    }

    if (!isUserRegistered) {
      ContentElement = RegistrationRequest
    }
  }

  const isMenuVisible = [
    AuthLoader,
    WaitingApproveMsg,
    RegistrationRequest,
  ].includes(ContentElement)
    ? false
    : true

  return (
    <AppContainer>
      {isMobile && <ContentHeader />}

      <ContentElement isAdmin={isAdmin} />

      <ContentFooter />

      {isMenuVisible && (
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
