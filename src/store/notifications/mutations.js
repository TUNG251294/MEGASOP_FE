export const SET_NEWNOTIFNUMBER = (state, notifNumber) => {
  state.totalNew = notifNumber
}

export const SET_NOTIFICATIONS = (state, notifications) => {
  state.notifications = notifications
}

export const ADD_NOTIFICATION = (state, { notification }) => {
  let notificationInList = state.notifications.find(item => {
    return item.id == notification.id
  })

  if (!notificationInList) {
    state.notifications.push({ notification })
  }
}
