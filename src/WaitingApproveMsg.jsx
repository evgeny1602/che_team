import { ContentHeading } from './ContentHeading'

export function WaitingApproveMsg() {
  return (
    <>
      <ContentHeading>Ваша заявка на регистрацию принята</ContentHeading>

      <div className="text-center">
        Ваша заявка на регистрацию принята и будет рассмотрена администрацией в
        ближайшее время. Как только она будет одобрена, вы получите доступ к
        нашему боту. Пожалуйста, подождите.
      </div>
    </>
  )
}
