const checkAddDeleteApproveResp = (data) => {
  if (!data) {
    return false
  }

  if (!('ok' in data)) {
    return false
  }

  return data.ok
}

const checkFetchResp = (data, itemsName, mapFunc) => {
  if (!data) {
    return []
  }

  if (!(itemsName in data)) {
    return []
  }

  if (!data[itemsName]) {
    return []
  }

  return data[itemsName].map(mapFunc)
}

// ------------------------------------------------------

export const sendRegistrationRequest = async (registerData) => {
  let body = new FormData()

  body.append('name', registerData.userName)
  body.append('tg_id', registerData.tgUserId)
  body.append('tg_username', registerData.tgUserName)
  body.append('tg_avatar', registerData.photoUrl)
  body.append('user_group_id', 2)

  await fetch('/che_team/api/users', { method: 'POST', body })
}

export const deletePlayer = async (userId) => {
  const resp = await fetch(`/che_team/api/users/${userId}`, {
    method: 'DELETE',
  })
  const data = await resp.json()

  return checkAddDeleteApproveResp(data)
}

export const approvePlayer = async (userId) => {
  const resp = await fetch(`/che_team/api/users/approve/${userId}`)
  const data = await resp.json()

  return checkAddDeleteApproveResp(data)
}

const mapUser = (item) => ({
  id: item.id,
  name: item.name,
  tgId: item.tg_id,
  tgUsername: item.tg_username,
  tgAvatar: item.tg_avatar,
  userGroupId: item.user_group_id,
  isApproved: item.is_approved == 1,
  userGroupName: item.userGroupName,
  isAdmin: item.is_admin == 1,
})

export const fetchPlayersList = async () => {
  const resp = await fetch('/che_team/api/users')
  const data = await resp.json()

  // console.log(data)

  return checkFetchResp(data, 'users', mapUser)
}

// ------------------------------------------------------

const mapEvent = (item) => ({
  id: item.id,
  dateTime: item.date_time,
  duration: item.duration,
  name: item.name,
  description: item.description,
  minUsersCount: item.min_users_count,
  maxUsersCount: item.max_users_count,
  price: item.price,
  userId: item.user_id,
  isHeld: item.is_held == 1,
  userName: item.user_name,
  users: item.users,
})

export const fetchEventsList = async () => {
  const resp = await fetch('/che_team/api/events')
  const data = await resp.json()

  return checkFetchResp(data, 'events', mapEvent)
}

export const editEvent = async (eventData) => {
  const resp = await fetch(`/che_team/api/events/${eventData.id}`, {
    method: 'PUT',
    body: JSON.stringify({
      date_time: eventData.dateTime,
      duration: eventData.duration,
      name: eventData.name,
      description: eventData.description,
      min_users_count: eventData.minUsersCount,
      max_users_count: eventData.maxUsersCount,
      price: eventData.price,
      user_id: eventData.userId,
    }),
  })
  const data = await resp.json()

  return checkAddDeleteApproveResp(data)
}

export const deleteEvent = async (eventId) => {
  const resp = await fetch(`/che_team/api/events/${eventId}`, {
    method: 'DELETE',
  })
  const data = await resp.json()

  return checkAddDeleteApproveResp(data)
}

export const addEvent = async (eventData) => {
  let body = new FormData()

  body.append('date_time', eventData.dateTime)
  body.append('duration', eventData.duration)
  body.append('name', eventData.name)
  body.append('description', eventData.description)
  body.append('min_users_count', eventData.minUsersCount)
  body.append('max_users_count', eventData.maxUsersCount)
  body.append('price', eventData.price)
  body.append('user_id', eventData.userId)

  const resp = await fetch('/che_team/api/events', {
    method: 'POST',
    body,
  })
  const data = await resp.json()

  return checkAddDeleteApproveResp(data)
}

// ------------------------------------------------------

export const editEventPlayer = async (userId, eventId, friends) => {
  const resp = await fetch(
    `/che_team/api/user_to_event/user/${userId}/event/${eventId}`,
    {
      method: 'PUT',
      body: JSON.stringify({ friends }),
    }
  )
  const data = await resp.json()

  return checkAddDeleteApproveResp(data)
}

export const addEventPlayer = async (userId, eventId, friends) => {
  let body = new FormData()

  body.append('friends', friends)

  const resp = await fetch(
    `/che_team/api/user_to_event/user/${userId}/event/${eventId}`,
    {
      method: 'POST',
      body,
    }
  )
  const data = await resp.json()

  return checkAddDeleteApproveResp(data)
}

export const deleteEventPlayer = async (userId, eventId) => {
  const resp = await fetch(
    `/che_team/api/user_to_event/user/${userId}/event/${eventId}`,
    { method: 'DELETE' }
  )
  const data = await resp.json()

  return checkAddDeleteApproveResp(data)
}

const mapEventPlayer = (item) => ({
  id: item.id,
  name: item.name,
  tgId: item.tg_id,
  tgUsername: item.tg_username,
  tgAvatar: item.tg_avatar,
  userGroupid: item.user_group_id,
  isApproved: item.is_approved,
  userGroupName: item.user_group_name,
  isAdmin: item.is_admin,
  friends: item.friends,
})

export const fetchEventPlayersList = async (eventId) => {
  const resp = await fetch(`/che_team/api/user_to_event/event/${eventId}`)
  const data = await resp.json()

  return checkFetchResp(data, 'users', mapEventPlayer)
}
