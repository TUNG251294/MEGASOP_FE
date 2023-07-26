<template>
  <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :height="280"
    :css-classes="cssClasses"
  />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { date, LocalStorage } from 'quasar'
import { axiosInstance } from 'boot/axios'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    }
  },
  data() {
    return {
      date: date.formatDate(Date.now(), 'DD/MM/YYYY'),
      today: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      chartData: {
        labels: [
          this.$t('dashboard.confirmed'),
          this.$t('dashboard.to_ship'),
          this.$t('dashboard.completed'),
          this.$t('dashboard.cancelled')
        ],
        datasets: [
          {
            //label: ["Hoàn thành"],
            backgroundColor: ['#FFD761', '#34A1CB', '#33C963', '#EE7677'],
            data: []
          }
        ]
      },
      chartOptions: {
        responsive: true,
        layout: {
          padding: 22
        },
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            display: true,
            title: {
              display: true,
              text: this.$t('dashboard.minute')
            }
          }
        }
      }
    }
  },
  async mounted() {
    await this.getSpendingTimeOrdersState()
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
          self.chartData.datasets[0].data = newArr
        })
    }
  },
  computed: {}
}
</script>
