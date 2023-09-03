const all = document.querySelector('.all')
const chest = document.querySelector('.chest')

let bodypart = 'all' // 預設all
getExercises(bodypart)

all.addEventListener('click', () => {
  all.style.color = '#c23a2b'
  all.style.background = '#faebd7'
  all.style.fontWeight = 'bold'
  bodypart = 'all' // 根據用戶選擇的身體部位設定變數值
  getExercises(bodypart)
})
chest.addEventListener('click', () => {
  chest.style.color = '#c23a2b'
  chest.style.background = '#faebd7'
  chest.style.fontWeight = 'bold'
  bodypart = 1 // 根據用戶選擇的身體部位設定變數值
  getExercises(bodypart)
})

async function getExercises (bodypart) {
  const response = await fetch(`http://localhost:3000/api/exercises?bodypart=${bodypart}`)
  const exercises = await response.json()
  displayExercises(exercises)
}

function displayExercises (exercises) {
  const exercisesList = document.querySelector('.exercisesFrame')
  exercisesList.innerHTML = '' // 清空現有的內容

  exercises.forEach(exercise => {
    const listItem = document.createElement('div')
    listItem.setAttribute('class', 'exercise-item')
    listItem.innerHTML = `
      <div class="exercise-name">${exercise.name}</div>
      <div class="exercise-photo">${exercise.Photo}</div>
    `
    exercisesList.appendChild(listItem)
  })
}
