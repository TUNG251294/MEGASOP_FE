export const setNewNotifNumber = ({ commit }, notifNumber) => {
  commit('SET_NEWNOTIFNUMBER', notifNumber ? notifNumber : [])
}

export const setNotifications = ({ commit }, notifications) => {
  commit('SET_NOTIFICATIONS', notifications ? notifications : [])
}

export const addNotification = ({ commit }, { notification }) => {
  commit('ADD_NOTIFICATION', { notification })
}
