let bodypart = 'all'
getExercises(bodypart)
// 調用函數以填充選項
populateBodypartOptions('bodypartOption')
populateBodypartOptions('modifyBodypart')

// 調用初始化函數
initializeBodypartsClickHandlers()

// 取得bodypart
async function getBodyparts () {
  try {
    const response = await fetch('/api/bodyparts')
    const bodyparts = await response.json()
    return bodyparts
  } catch (error) {
    console.error('Error fetching bodyparts data:', error)
    return []
  }
}

// 設定bodypart傳遞給function setupBodypartClickHandler
async function initializeBodypartsClickHandlers () {
  try {
    const bodyparts = await getBodyparts()
    const bodypartNames = bodyparts.map(part => part.name)
    bodypartNames.unshift('all')
    bodypartNames.forEach(part => {
      setupBodypartClickHandler(part, bodypartNames) // 將 bodyparts 傳遞給 setupBodypartClickHandler
    })
  } catch (error) {
    console.error('Error initializing bodyparts click handlers:', error)
  }
}

// 設定點擊bodypart動作
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

// 按照部位發送API，並接收資料
async function getExercises (bodypart) {
  const response = await fetch(`/api/exercises?bodypart=${bodypart}`)
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
        <div class="card mb-4 shadow">
          <img class="card-img-top" src="${exercise.photo}" alt="${exercise.name}" width="286px" height="180px">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${exercise.name}</h5>
            <div class="d-flex justify-content-between align-items-center">
              <button type="button" class="btn btn-primary btn-sm">+加入菜單</button>
              ${exercise.user_id
                ? `<div class="btn-group">
                  <button type="button" class="btn btn-success btn-sm edit-exercise" data-exercise-id="${exercise.id}" data-bodypart-id="${exercise.bodypart_id}" data-exercise-name="${exercise.name}" data-bs-toggle="modal" data-bs-target="#modifyExerciseModal">修改</button>
                  <button type="button" class="btn btn-danger btn-sm delete-exercise" data-exercise-id="${exercise.id}"  data-exercise-name="${exercise.name}">刪除</button>
                </div>`
                : ''}
            </div>
          </div>
        </div>
      `
    exercisesList.appendChild(listItem)
  })
}

// 產生modal選項
async function populateBodypartOptions (bodypart) {
  const bodypartSelect = document.getElementById(bodypart)
  try {
    const bodyparts = await getBodyparts()
    bodyparts.forEach(part => {
      const option = document.createElement('option')
      option.value = part.id
      option.textContent = part.name
      bodypartSelect.appendChild(option)
    })
  } catch (error) {
    console.error('Error populating bodypart options:', error)
  }
}
// modal新增exercise
const submitButton = document.getElementById('saveExercise')
submitButton.addEventListener('click', function (event) {
  event.preventDefault()

  const form = document.getElementById('exerciseForm')

  const formData = new FormData(form)
  fetch('/api/exercises', {
    method: 'POST',
    body: formData
  })
    .then(response => {
      if (response.ok) {
        localStorage.setItem('successMessage', '新增成功')
        window.location.href = '/exercises'
      } else {
        alert('新增失敗')
      }
    })
    .catch(error => {
      console.error('API error:', error)
      alert('發生錯誤，請稍後再試。')
    })
})

document.addEventListener('DOMContentLoaded', function () {
  const successMessage = localStorage.getItem('successMessage')

  if (successMessage) {
    alert(successMessage)
    localStorage.removeItem('successMessage')
  }
})

// 更新&刪除事件
const exercisesList = document.querySelector('.exerciseContent .row')

exercisesList.addEventListener('click', event => {
  const target = event.target

  if (target.classList.contains('edit-exercise')) {
    const exerciseId = target.getAttribute('data-exercise-id')
    const bodypartId = target.getAttribute('data-bodypart-id')
    const modifyName = target.getAttribute('data-exercise-name')
    const bodypartSelect = document.getElementById('modifyBodypart')
    const nameSelect = document.getElementById('modifyName')
    const matchingOption =
      bodypartSelect.querySelector(`option[value="${bodypartId}"]`)
    if (matchingOption) {
      matchingOption.selected = true
    }
    nameSelect.value = modifyName
    const modifyButton = document.getElementById('modifyExercise')
    modifyButton.setAttribute('data-exercise-id', exerciseId)
  } else if (target.classList.contains('delete-exercise')) {
    const exerciseId = target.getAttribute('data-exercise-id')
    const exerciseName = target.getAttribute('data-exercise-name')
    confirmDelete(exerciseName, exerciseId)
  }
})

// modal更新exercise
const modifyButton = document.getElementById('modifyExercise')
modifyButton.addEventListener('click', function (event) {
  event.preventDefault()

  const form = document.getElementById('modifyexerciseForm')
  const exerciseId = modifyButton.getAttribute('data-exercise-id')
  const formData = new FormData(form)
  formData.append('exerciseId', exerciseId)
  fetch('/api/exercises', {
    method: 'PUT',
    body: formData
  })
    .then(response => {
      if (response.ok) {
        localStorage.setItem('successMessage', '更新成功')
        window.location.href = '/exercises'
      } else {
        alert('更新失敗')
      }
    })
    .catch(error => {
      console.error('API error:', error)
      alert('發生錯誤，請稍後再試。')
    })
})

// 刪除自己的exercise
function confirmDelete (exerciseName, exerciseId) {
  const confirmation = confirm(`確定要刪除 ${exerciseName} 嗎？`)
  if (confirmation) {
    fetch(`/api/exercises/${exerciseId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          alert('已成功删除')
          location.reload()
        } else {
          alert('删除出現錯誤')
        }
      })
      .catch(error => {
        console.error('API error:', error)
        alert('删除出現錯誤')
      })
  }
  return false
}
