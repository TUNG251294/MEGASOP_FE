<template>
  <q-btn
    dense
    round
    flat
    icon="notifications_none"
    class="text-secondary w40 h40 mr-2"
    size="md"
  >
    <q-badge color="red" floating rounded :label="totalNew" />
    <q-menu :offset="[100, 15]" class="q-notifications pb-50">
      <q-item-label header class="px-1 pt-1 pb-0 label-md">
        <div class="flex items-center justify-between">
          <div>
            Bạn có
            <strong class="title-xs">{{ totalNew }}</strong> thông báo mới
          </div>
          <q-btn
            flat
            dense
            icon="playlist_add_check"
            size="14px"
            padding="none"
            :ripple="false"
            @click="markAllRead()"
            ><q-tooltip>Đánh dấu tất cả đã xem</q-tooltip></q-btn
          >
        </div>
      </q-item-label>
      <q-separator class="mx-1 mt-25 mb-50" />
      <q-list ref="scrollTargetRef" style="width: 390px">
        <!-- <q-infinite-scroll
          v-if="notifications && notifications.length > 0"
          @load="onLoadNotifs"
          :offset="250"
          :scroll-target="scrollTargetRef"
        > -->
        <q-infinite-scroll
          v-if="notifications && notifications.length > 0"
          @load="onLoadNotifs"
          :offset="250"
        >
          <NotificationItem
            v-for="item in notifications"
            :item="item"
            :key="item.id"
            @click="markAsRead(item)"
          />

          <template v-slot:loading v-if="loadingi == true">
            <div class="text-center q-my-md">
              <q-spinner-dots color="primary" size="40px" />
            </div>
          </template>
        </q-infinite-scroll>
        <div
          v-if="!notifications || notifications.length == 0"
          class="empty-notifs d-flex flex-column align-items-center justify-content-center"
          style="height: 290px"
        >
          <img src="../../assets/empty-notifs.png" alt="empty notification" />
          <p class="title-sm text-black-500">Thông báo trống</p>
          <p class="body-sm text-black-400">
            Hiện tại bạn không có thông báo mới
          </p>
        </div>
      </q-list>
    </q-menu>
  </q-btn>
</template>
<script>
import { defineComponent } from 'vue'
import { LocalStorage } from 'quasar'
import { axiosInstance } from '../../boot/axios'
import { Constants } from 'src/boot/Constants'
import firebaseMessaging from 'boot/firebase'
import NotificationItem from './NotificationItem.vue'

export default defineComponent({
  name: 'Notifications',
  components: {
    NotificationItem
  },
  data() {
    return {
      loadingi: false,
      totalNew: 0,
      notifications: [],
      pageSize: 10,
      nextPage: 1,
      columns: [
        {
          name: 'id',
          label: 'Thông báo',
          align: 'left',
          field: 'id',
          sortable: false
        }
      ]
    }
  },
  mounted() {
    firebaseMessaging && this.activePushNotification()
    this.getNewNotificationNumber()
    this.getNotifications(true)

    firebaseMessaging &&
      firebaseMessaging.onMessage(payload => {
        console.log('Message received. ', payload)
        this.totalNew++
        this.getNotifications(true)
      })
  },
  methods: {
    activePushNotification() {
      firebaseMessaging
        .getToken({
          vapidKey: Constants.FCM_VAPIDKEY
        })
        .then(currentToken => {
          let token = {
            firebaseToken: LocalStorage.getItem('fcm_tk')
          }
          if (currentToken && currentToken !== token.firebaseToken) {
            LocalStorage.set('fcm_tk', currentToken)
            let newToken = {
              firebaseToken: currentToken
            }
            this.firebaseTokenRegistry(newToken)
          }
        })
        .catch(err => {
          console.log('An error occurred while retrieving token. ', err)
          // ...
        })
    },

    firebaseLogout() {
      axiosInstance.post('/firebase/logout')
    },

    firebaseTokenRegistry(objToken) {
      axiosInstance
        .post('/firebase', objToken)
        .then(response => {
          console.log(response.data?.data?.message)
        })
        .catch(error => {
          console.log(error)
        })
    },

    getNewNotificationNumber: function () {
      var self = this
      axiosInstance
        .get('/notifications/badges')
        .then(response => {
          self.totalNew = response.data?.data?.countBadgesNotification
        })
        .catch(error => {
          console.log(error)
        })
    },

    getNotifications: function (isNew = true) {
      var self = this
      if (isNew) {
        self.nextPage = 1
        self.notifications = []
      }

      let url = '/notifications?segment=' + (self.nextPage - 1) * self.pageSize
      url += '&offset=' + self.pageSize
      url += '&limitSearch=true'

      axiosInstance
        .get(url)
        .then(response => {
          let notifs = response?.data?.data?.notifications

          if (notifs && notifs.length > 0) {
            self.loadingi = true
            self.nextPage++
            self.notifications.push(...response?.data?.data?.notifications)
          } else {
            self.loadingi = false
          }
        })
        .catch(error => {
          console.log(error)
        })
    },

    onLoadNotifs: function (index, done) {
      var self = this
      if (
        self.notifications &&
        self.notifications.length > 0 &&
        index > 1 &&
        self.loadingi == true
      ) {
        setTimeout(() => {
          self.getNotifications(false)
          done()
        }, 2000)
      } else {
        setTimeout(() => {
          done()
        }, 200)
        return false
      }
    },

    markAllRead: function () {
      axiosInstance
        .put('/notifications/seen-all')
        .then(response => {
          this.totalNew = 0
          this.getNotifications(true)
        })
        .catch(error => console.log(error))
    },

    markAsRead: function (item) {
      let arrayUrl = item.deeplink.split('=')
      // let deeplink = arrayUrl[0]
      // deeplink = deeplink.slice(0, -3)
      let id = parseInt(arrayUrl[1])
      axiosInstance
        .put('/notifications/seen', {
          notificationId: item.id
        })
        .then(response => {
          console.log(response)
        })
        .catch(error => console.log(error))

      switch (item.icon_type) {
        case 'RETAILER':
          LocalStorage.set('rt_i_pt', id)
          break

        case 'RETAILER_WAREHOUSE':
          LocalStorage.set('wh_ip_t_i', id)
          break

        case 'EVENT':
          LocalStorage.set('pm_i_pt', id)
          break
      }

      window.location.href = item.deeplink
    }
  }
})
</script>
