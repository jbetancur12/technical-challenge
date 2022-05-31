function NoRelativeDay(publishDate, localeString) {
  const dateOptions = {
    timeZone: 'America/Bogota',
    month: 'short'
  }
  return `Updated on ${publishDate.getDate()} ${new Intl.DateTimeFormat(
    'default',
    dateOptions
  ).format(publishDate)} ${publishDate.getFullYear().toString()} `
}

const DateTimeInfo = (
  date,
  relative = false,
  localeString = 'es-CO',
  dateLong = false
) => {
  let dateOptions
  if (!relative) {
    const now = new Date()
    let result = now - date
    const publishDate = new Date(date)
    let interval = 0
    if (
      ((now.getFullYear() === publishDate.getFullYear() &&
        now.getMonth() === publishDate.getMonth()) ||
        now.getDate() !== publishDate.getDate()) &&
      !dateLong
    ) {
      interval = Math.abs((now - publishDate) / 1000)
      if (interval < 60) {
        result = `Updated ${Math.floor(interval)} seconds ago`
        return result
      }
      if (interval < 3600) {
        const isMinutePlural = Math.floor(interval / 60) >= 2
        const plural = isMinutePlural ? 's' : ' '
        result = `Updated ${Math.floor(interval / 60)} minute${plural} ago`
        return result
      }
      if (interval < 86400) {
        dateOptions = {
          timeZone: 'America/Bogota',
          month: 'short'
        }
        const displayDateLocaleString = publishDate.toLocaleString(
          localeString,
          dateOptions
        )
        const nowLocaleString = now.toLocaleString(localeString, dateOptions)
        const hasSameDay =
          displayDateLocaleString.substring(3, 5) ===
          nowLocaleString.substring(3, 5)
        if (hasSameDay) {
          const isHourPlural = Math.floor(interval / 3600) >= 2
          const plural = isHourPlural ? 's' : ' '
          result = `Updated ${Math.floor(interval / 3600)} hour${plural} ago`
          return result
        } else return NoRelativeDay(publishDate, localeString)
      } else return NoRelativeDay(publishDate, localeString)
    }
    return NoRelativeDay(publishDate, localeString)
  }
  return ''
}

export default DateTimeInfo
