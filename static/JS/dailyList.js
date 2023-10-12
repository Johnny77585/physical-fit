// FullCalendar
document.addEventListener('DOMContentLoaded', async function () {
  const calendarEl = document.getElementById('calendar')
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'zh-tw',
    events: await getExerciseListsForCalendar()
  })

  calendar.render()
})

// 顯示菜單到FullCalendar
async function getExerciseListsForCalendar () {
  try {
    const response = await fetch('/api/lists')
    const data = await response.json()
    const events = data
      .filter(item => item.ListedDates.length > 0)
      .map(item => {
        return {
          id: item.id,
          title: item.name,
          start: formatDateForFullCalendar(item.ListedDates[0].date),
          end: formatDateForFullCalendar(item.ListedDates[0].date)
        }
      })
    return events
  } catch (error) {
    console.error(error)
    return []
  }
}

// 調整後端Date格式以符合FullCalendar
function formatDateForFullCalendar (dataDate) {
  const date = new Date(dataDate)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
