let bodypart = 'all' // 預設all
getExercises(bodypart)

const bodyparts = ['all', '胸部', '背部', '肩部', '腿部', '手部', '核心', '有氧', '其他']

// 循環每個部位做點擊的動作
bodyparts.forEach(part => {
  const element = document.getElementById(part)
  if (element) {
    element.addEventListener('click', () => {
      // 重置所有部位的樣式
      bodyparts.forEach(p => {
        const el = document.getElementById(p)
        if (el) {
          el.style.color = ''
          el.style.background = ''
          el.style.fontWeight = ''
        }
      })

      // 設定點擊的樣式
      element.style.color = '#c23a2b'
      element.style.background = '#faebd7'
      element.style.fontWeight = 'bold'

      bodypart = part
      getExercises(bodypart)
    })
  }
})

// 按照部位發送API，並接收資料
async function getExercises (bodypart) {
  const response = await fetch(`http://localhost:3000/api/exercises?bodypart=${bodypart}`)
  const exercises = await response.json()
  displayExercises(exercises)
}

// 按照每個部位顯示該運動
function displayExercises (exercises) {
  const exercisesList = document.querySelector('.exerciseContent .row')
  exercisesList.innerHTML = '' // 清空現有的內容

  exercises.forEach(exercise => {
    const listItem = document.createElement('div')
    listItem.setAttribute('class', 'col-md-4')
    listItem.innerHTML = `
        <div class="card mb-4 shadow-sm text-bg-secondary ">
          <img class="card-img-top" src=${exercise.Photo} alt="Card image cap" width="286px" height="180px">
            <div class="card-body d-flex justify-content-between">
              <p class="card-text">${exercise.name}</p>
              <button type="button" class="btn btn-outline-light">加入菜單</button>
            </div>
        </div>
    `
    exercisesList.appendChild(listItem)
  })
}
