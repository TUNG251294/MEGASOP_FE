<template>
  <div>
    <apexcharts
      type="donut"
      :options="chartOptionsI18n"
      :series="series"
      class="d-flex justify-content-center"
    ></apexcharts>
  </div>
</template>
<script>
import { date } from 'quasar'
import { axiosInstance } from 'boot/axios'
import VueApexCharts from 'vue3-apexcharts'

export default {
  name: 'Donut Chart',
  components: {
    apexcharts: VueApexCharts
  },
  props: {
    fromDate: String,
    toDate: String
  },
  data: function () {
    return {
      series: [],
      from_date: this.fromDate,
      to_date: this.toDate
    }
  },
  computed: {
    chartOptionsI18n: function () {
      return {
        chart: {
          id: 'donut-chart'
        },
        legend: {
          position: 'right'
        },
        labels: [
          this.$t('dashboard.to_pay'),
          this.$t('dashboard.to_ship'),
          this.$t('dashboard.completed'),
          this.$t('dashboard.cancelled'),
          this.$t('dashboard.returned')
        ],
        colors: ['#FFD761', '#34A1CB', '#33C963', '#EE7677', '#BA70EB'],
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                value: {
                  show: true
                },
                total: {
                  show: true,
                  label: this.$t('dashboard.order'),
                  color: '#000'
                }
              }
            }
          }
        },
        responsive: [
          {
            // 1920 110%
            // 1920 90%
            // 1920 100%
            breakpoint: 2560,
            options: {
              chart: {
                width: 450
              },
              legend: {
                position: 'right'
              }
            }
          },
          {
            // 1366 90%
            breakpoint: 1600,
            options: {
              chart: {
                width: 435
              },
              legend: {
                position: 'right'
              }
            }
          },
          {
            // 1366 100%
            // 1280 90%
            breakpoint: 1440,
            options: {
              chart: {
                width: 395
              },
              legend: {
                position: 'right'
              }
            }
          },
          {
            // 1366 110%
            // 1280 100%
            breakpoint: 1366,
            options: {
              chart: {
                width: 380
              },
              legend: {
                position: 'right'
              }
            }
          },
          {
            // 1280 110%
            breakpoint: 1199,
            options: {
              chart: {
                width: '100%',
                height: 335
              },
              legend: {
                position: 'bottom',
                horizontalAlign: 'center'
              }
            }
          }
        ]
      }
    },
    propsObject() {
      return {
        fromDate: this.fromDate,
        toDate: this.toDate
      };
    }
  },
  mounted() {
    this.getOrderStates(this.from_date, this.to_date)
  },
  watch: {
    propsObject(newVal, oldVal) {
      this.getOrderStates(newVal.fromDate, newVal.toDate);
      this.from_date = newVal.fromDate;
      this.to_date = newVal.toDate;
    }
  },
  methods: {
    getOrderStates: function (fromDate, toDate) {
      let self = this
      let today = date.formatDate(Date.now(), 'YYYY-MM-DD')

      let url = '/orders/sellin/summary/ordersState'

      if (undefined !== fromDate && '' !== fromDate) {
        url +=
          '?from=' +
          date.formatDate(
            date.extractDate(fromDate, 'DD/MM/YYYY'),
            'YYYY-MM-DD'
          ) +
          '&to=' +
          date.formatDate(
            date.extractDate(toDate, 'DD/MM/YYYY'),
            'YYYY-MM-DD'
          )
      } else {
        url += '?date=' + today
      }

      axiosInstance
        .get(url)
        .then(response => {
          let obj = response.data.data
          let sortedKey = [
            'new_count',
            'approved_count',
            'finish_count',
            'canceled_count',
            'return_count'
          ]
          const findKey = key =>
            Object.keys(sortedKey).find(el => sortedKey[el] === key)
          let newObj = Object.keys(obj)
            .sort((a, b) => findKey(a) - findKey(b))
            .reduce((o, e) => ({ ...o, [e]: obj[e] }), {})
          let newArr = Object.values(newObj)
          self.series = newArr
        })
    }
  }
}
</script>
<style scoped>
.vue-apexcharts {
  min-height: 1px !important;
}
</style>
