export class ProcessDataHelper {
  constructor (metricName) {
    this.metricName = metricName
  }

  formatDate (timestamp) {
    return `${timestamp.getDate()}/${timestamp.getMonth() + 1}`
  }

  formatForClient (inputObj, metricName) {
    const currentDate = new Date()
    const result = []

    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate)
      date.setDate(currentDate.getDate() - i)
      const formattedDate = this.formatDate(date)

      const metricValue = inputObj[0][formattedDate] || 0
      const item = { date: formattedDate }
      item[metricName] = metricValue
      result.push(item)
    }

    return result.reverse()
  }
}
