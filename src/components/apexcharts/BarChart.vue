<template>
  <div>
    <apexcharts
      width="100%"
      type="bar"
      :options="chartOptionsI18n"
      :series="series"
    ></apexcharts>
  </div>
</template>
<script>
import { axiosInstance } from 'boot/axios'
import VueApexCharts from 'vue3-apexcharts'

export default {
  name: 'Column Chart',
  components: {
    apexcharts: VueApexCharts
  },
  data() {
    return {
      series: [{ name: '', data: [] }]
    }
  },
  computed: {
    chartOptionsI18n: function () {
      return {
        chart: {
          height: 350,
          type: 'bar',
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            columnWidth: '45%',
            distributed: true,
            dataLabels: {
              position: 'top' // top, center, bottom
            }
          }
        },
        colors: ['#FFD761', '#34A1CB', '#33C963', '#EE7677'],
        dataLabels: {
          enabled: true,
          offsetY: -20,
          style: {
            fontSize: '12px',
            fontWeight: 600,
            colors: ['#555']
          }
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: [
            this.$t('dashboard.confirmed'),
            this.$t('dashboard.to_ship'),
            this.$t('dashboard.completed'),
            this.$t('dashboard.cancelled')
          ]
        },
        yaxis: {
          title: {
            text: this.$t('dashboard.minute'),
            style: {
              fontSize: '14px',
              fontWeight: 400
            }
          }
        },
        tooltip: {
          theme: 'dark',
          custom: ({ series, seriesIndex, dataPointIndex, w }) => {
            return `<div class="arrow_box px-50 py-25 label-md"> <span> ${
              series[seriesIndex][dataPointIndex]
            } ${this.$t('dashboard.minuteTooltip')}</span> </div>`
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
                height: 323
              }
            }
          },
          {
            // 1366 90%
            breakpoint: 1600,
            options: {
              chart: {
                height: 338
              }
            }
          },
          {
            // 1366 100%
            // 1280 90%
            breakpoint: 1440,
            options: {
              chart: {
                height: 273
              }
            }
          },
          {
            // 1366 110%
            // 1280 100%
            breakpoint: 1366,
            options: {
              chart: {
                height: 288
              }
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.getSpendingTimeOrdersState()
  },
  methods: {
    getSpendingTimeOrdersState() {
      let self = this
      axiosInstance
        .get('/orders/sellin/summary/spendingTimeOrdersState')
        .then(response => {
          let obj = response.data.data
          let sortedKey = [
            'approved_avg',
            'delivered_avg',
            'finish_avg',
            'cancel_avg'
          ]
          const findKey = key =>
            Object.keys(sortedKey).find(el => sortedKey[el] === key)
          let newObj = Object.keys(obj)
            .sort((a, b) => findKey(a) - findKey(b))
            .reduce((o, e) => ({ ...o, [e]: obj[e] }), {})

          let newArr = Object.values(newObj)
          self.series[0].data = newArr
        })
    }
  }
}
</script>

<style scoped>
@media screen and (min-width: 1200px) and (max-width: 1439px) {
  .vue-apexcharts {
    min-height: 1px !important;
  }
}
</style>
