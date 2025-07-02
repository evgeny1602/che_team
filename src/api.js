export const sendRegistrationRequest = async (
  userName,
  tgId,
  tgUsername,
  tgAvatar
) => {
  let body = new FormData()

  body.append('name', userName)
  body.append('tg_id', tgId)
  body.append('tg_username', tgUsername)
  body.append('tg_avatar', tgAvatar)
  body.append('user_group_id', 2)

  await fetch('/che_team/api/users', { method: 'POST', body })
}

export const deletePlayer = async (userId) => {
  const resp = await fetch(`/che_team/api/users/${userId}`, {
    method: 'DELETE',
  })
  const data = await resp.json()

  if (!data) {
    return false
  }

  if (!('ok' in data)) {
    return false
  }

  return data.ok
}

export const approvePlayer = async (userId) => {
  const resp = await fetch(`/che_team/api/users/approve/${userId}`)
  const data = await resp.json()

  if (!data) {
    return false
  }

  if (!('ok' in data)) {
    return false
  }

  return data.ok
}

export const fetchPlayersList = async () => {
  const resp = await fetch('/che_team/api/users')
  const data = await resp.json()

  if (!data) {
    return []
  }

  if (!('users' in data)) {
    return []
  }

  if (!data.users) {
    return []
  }

  return data.users.map((item) => ({
    id: item.id,
    name: item.name,
    tgId: item.tg_id,
    tgUsername: item.tg_username,
    tgAvatar: item.tg_avatar,
    userGroupId: item.user_group_id,
    isApproved: item.is_approved == 1,
    userGroupName: item.userGroupName,
    isAdmin: item.is_admin == 1,
  }))
}
