import moment from 'moment'

export default {
  formatTime: function(data) {
    return moment(data).format('YYYY-MM-DD HH:mm:ss')
  },
  formatDateEx: function(data, format) {
    if (format) {
      return moment(data).format(format)
    }
    return moment(data).format('YYYY-MM-DD')
  },
  formatDate: (row, column, cellValue, index) => {
    if (!cellValue || cellValue === '') {
      return '无记录'
    }
    return moment(cellValue).format('YYYY-MM-DD HH:mm:ss')
  },

  data: {
    sex: {
      1: '男',
      2: '女'
    }
  }
}
