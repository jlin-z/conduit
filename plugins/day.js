import Vue from 'vue'
import day from 'dayjs'

export default function () {
  Vue.filter('date', function (value, format = 'YYYY-MM-DD hh:mm:ss') {
    return day(value).format(format)
  })
}