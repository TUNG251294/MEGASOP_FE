<template>
  <Doughnut
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
  />
</template>

<script>
import { Doughnut } from 'vue-chartjs'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from 'chart.js'
import { date, LocalStorage } from 'quasar'
import { axiosInstance } from 'boot/axios'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  ChartDataLabels
)

export default {
  name: 'DoughnutChart',
  components: {
    Doughnut
  },
  props: {
    chartId: {
      type: String,
      default: 'doughnut-chart'
    },
    height: Number
  },
  data() {
    return {
      date: date.formatDate(Date.now(), 'DD/MM/YYYY'),
      today: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      fromDate: date.formatDate(
        date.subtractFromDate(Date.now(), { days: 7 }),
        'DD/MM/YYYY'
      ),
      toDate: date.formatDate(Date.now(), 'DD/MM/YYYY'),
      newdata: [],
      chartData: {
        labels: [
          this.$t('dashboard.to_pay'),
          this.$t('dashboard.completed'),
          this.$t('dashboard.cancelled'),
          this.$t('dashboard.returned'),
          this.$t('dashboard.to_ship')
        ],
        datasets: [
          {
            backgroundColor: [
              '#FFD761',
              '#33C963',
              '#EE7677',
              '#BA70EB',
              '#34A1CB'
            ],
            data: []
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
          legend: {
            position: 'right'
          },
          datalabels: {
            formatter: (value, ctx) => {
              let sum = 0
              let dataArr = ctx.chart.data.datasets[0].data
              dataArr.map(data => {
                sum += data
              })
              let percentage =
                value != 0 ? ((value * 100) / sum).toFixed(2) + '%' : ''
              return percentage
            },
            color: '#fff',
            labels: {
              title: {
                font: {
                  weight: 'bold',
                  size: 12
                }
              }
            }
          },
          legend: {
            display: true,
            position: 'right'
          }
        }
      }
    }
  },
  async mounted() {
    this.getOrderStates()
  },
  methods: {
    getOrderStates: function () {
      let self = this
      let url = '/orders/sellin/summary/ordersState'

      if (undefined !== self.fromDate && '' !== self.fromDate) {
        url +=
          '?from=' +
          date.formatDate(
            date.extractDate(self.fromDate, 'DD/MM/YYYY'),
            'YYYY-MM-DD'
          ) +
          '&to=' +
          date.formatDate(
            date.extractDate(self.toDate, 'DD/MM/YYYY'),
            'YYYY-MM-DD'
          )
      } else {
        url += '?date=' + self.today
      }

      axiosInstance
        .get(url)
        .then(response => {
          let ar = Object.values(response.data.data)
          self.chartData.datasets[0].data = ar
        })
    }
  }
}
</script>
