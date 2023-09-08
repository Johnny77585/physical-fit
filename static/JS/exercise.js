let bodypart = 'all' // 預設all
getExercises(bodypart)

async function getBodyparts () {
  try {
    const response = await fetch('http://localhost:3000/api/bodyparts')
    const bodyparts = await response.json()
    return bodyparts
  } catch (error) {
    console.error('Error fetching bodyparts data:', error)
    return []
  }
}

async function initializeBodypartsClickHandlers () {
  try {
    const bodyparts = await getBodyparts()
    bodyparts.forEach(part => {
      setupBodypartClickHandler(part, bodyparts) // 將 bodyparts 傳遞給 setupBodypartClickHandler
    })
  } catch (error) {
    console.error('Error initializing bodyparts click handlers:', error)
  }
}

function setupBodypartClickHandler (part, allBodyparts) { // 接收所有部位的參數
  const element = document.getElementById(part)
  if (element) {
    element.addEventListener('click', () => {
      // 重置所有部位的樣式
      allBodyparts.forEach(p => { // 使用傳遞進來的 allBodyparts
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
}

// 調用初始化函數
initializeBodypartsClickHandlers()

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

async function populateBodypartOptions () {
  const bodypartSelect = document.getElementById('bodypart')
  try {
    const bodyparts = await getBodyparts()
    bodyparts.forEach(part => {
      const option = document.createElement('option')
      option.value = part // 設定選項的值
      option.textContent = part // 設定選項的顯示文字
      bodypartSelect.appendChild(option) // 將選項添加到選擇框中
    })
  } catch (error) {
    console.error('Error populating bodypart options:', error)
  }
}

// 調用函數以填充選項
populateBodypartOptions()
