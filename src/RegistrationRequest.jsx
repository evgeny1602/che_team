import { useState } from 'react'
import { tgUser } from './tgUtils'

import { PrimaryButton } from './PrimaryButton'
import { ContentHeading } from './ContentHeading'

import { sendRegistrationRequest } from './api'
import { FormInput } from './FormInput'

export function RegistrationRequest() {
  const [userName, setUserName] = useState('')

  const onSubmit = async () => {
    await sendRegistrationRequest({
      userName,
      tgUserId: tgUser.id,
      tgUserName: tgUser.username,
      photoUrl: tgUser.photo_url,
    })

    location.reload()
  }

  return (
    <>
      <ContentHeading>Заявка на регистрацию</ContentHeading>

      <div className="flex flex-col flex-nowrap justify-center items-center gap-8">
        <div className="text-center">
          Вы не зарегистрированы в нашем боте.
          <br />
          Для регистрации введите свое имя и нажмите на кнопку ниже.
        </div>

        <FormInput
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Ваше имя"
        />

        <PrimaryButton
          disabled={userName.length < 3}
          onClick={onSubmit}
        >
          Подать заявку на регистрацию
        </PrimaryButton>
      </div>
    </>
  )
}
