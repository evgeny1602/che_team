import { useState } from 'react'
import { tgColorClasses, tgUser } from './tgUtils'

import { PrimaryButton } from './PrimaryButton'
import { ContentContainer } from './ContentContainer'
import { ContentInnerContainer } from './ContentInnerContainer'
import { ContentHeading } from './ContentHeading'

import { sendRegistrationRequest } from './api'

export function RegistrationRequest() {
  const [userName, setUserName] = useState('')

  const onSubmit = async () => {
    await sendRegistrationRequest(
      userName,
      tgUser.id,
      tgUser.username,
      tgUser.photo_url
    )

    location.reload()
  }

  return (
    <ContentContainer>
      <ContentHeading>Заявка на регистрацию</ContentHeading>

      <ContentInnerContainer>
        <div className="text-center">
          <p>Вы не зарегистрированы в нашем боте.</p>
          <p>Для регистрации введите свое имя и нажмите на кнопку ниже.</p>
        </div>

        <div className="min-h-7"></div>

        <input
          className={`rounded-4xl px-4 py-2 border-1 ${tgColorClasses.border}`}
          placeholder="Ваше имя"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <div className="min-h-7"></div>

        <PrimaryButton
          disabled={userName.length < 3}
          onClick={onSubmit}
        >
          Подать заявку на регистрацию
        </PrimaryButton>
      </ContentInnerContainer>
    </ContentContainer>
  )
}
