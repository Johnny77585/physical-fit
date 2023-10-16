// 取得exerciseList內容
getExerciseLists()
async function getExerciseLists () {
  const listCards = document.querySelector('.listContent .row')
  const listId = null
  const response = await fetch(`api/exerciselists/${listId}`)
  const lists = await response.json()
  const displayedListExercises = {}
  const filteredLists = lists.filter(list => list.isCopied === 0)
  filteredLists.forEach(list => {
    const listId = list.id
    if (!displayedListExercises[listId]) {
      displayedListExercises[listId] = []
    }
    displayedListExercises[listId].push(list.ExerciseLists.Exercise.name)
  })
  for (const listId in displayedListExercises) {
    if (Object.hasOwnProperty.call(displayedListExercises, listId)) {
      const exerciseIds = displayedListExercises[listId]
      const exerciseIdList = exerciseIds.join('<br>')
      const listName = lists.find(list => list.id === parseInt(listId)).name
      listCards.innerHTML += `
        <div class="card mb-3" style="max-width: 18rem;">
          <div class="card-body text-primary">
            <div class="d-flex justify-content-between align-items-center">
            <h5 class="card-title">${lists.find(list => list.id === parseInt(listId)).name}</h5>
              <div class="btn-group">
              <button type="button" class="btn btn-success btn-sm edit-list" data-list-id="${listId}" data-bs-toggle="modal" data-bs-target="#editExerciseListModal">修改</button>
              <button type="button" class="btn btn-danger btn-sm delete-list" data-list-id="${listId}" data-exercise-name="${listName}">刪除</button>
              </div>
            </div>
            <p class="card-text">${exerciseIdList}</p>
            <button type="button" class="btn btn-success btn-sm add-date" data-list-id="${listId}" data-bs-toggle="modal" data-bs-target="#dateModal" style="position: absolute; bottom: 5%; right: 5%;">+</button>
          </div>
        </div>
        `
    }
  }
}

// 使用flatpickr
const datePicker = flatpickr('#datePicker', {
  dateFormat: 'm/d/Y', // 原始日期格式为月/日/年
  altInput: true,
  altFormat: 'Y-m-d', // 设置备用输入框的日期格式为年-月-日
  locale: 'zh_tw'
})

// modal加入日程
const saveDateButton = document.getElementById('saveDateButton')
saveDateButton.addEventListener('click', function (event) {
  event.preventDefault()
  const listId = event.target.getAttribute('data-list-id')
  const formattedDate = datePicker.altInput.value
  const data = {
    date: formattedDate,
    listId
  }
  fetch('/api/lists', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
        localStorage.setItem('successMessage', '加入成功')
        window.location.href = '/exerciseLists'
      } else {
        alert('新增失敗')
      }
    })
    .catch(error => {
      console.error('API error:', error)
      alert('發生錯誤，請稍後再試。')
    })
})

// modal新增exerciseList
const submitButton = document.getElementById('saveList')
submitButton.addEventListener('click', function (event) {
  event.preventDefault()

  const form = document.getElementById('listForm')
  const formData = new FormData(form)
  fetch('/api/exerciselist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(Object.fromEntries(formData))
  })
    .then(response => {
      if (response.ok) {
        localStorage.setItem('successMessage', '新增成功')
        window.location.href = '/exerciseLists'
      } else {
        alert('新增失敗')
      }
    })
    .catch(error => {
      console.error('API error:', error)
      alert('發生錯誤，請稍後再試。')
    })
})

// 產生修改菜單的modal
const editListButton = document.getElementById('editListButton')
document.addEventListener('click', async function (event) {
  if (event.target.classList.contains('edit-list')) {
    const listId = event.target.getAttribute('data-list-id')
    editListButton.setAttribute('data-list-id', listId)
    const editListForm = document.getElementById('editListForm')
    editListForm.innerHTML = ''
    if (listId) {
      const response = await fetch(`/api/exerciselists/${listId}`)
      const list = await response.json()
      const allIdsDefined = list.every(item => item.ExerciseLists.Exercise.id !== null)

      if (allIdsDefined) {
        list.forEach(exerciseList => {
          const { Exercise, setsDetails, id } = exerciseList.ExerciseLists
          const exerciseName = Exercise.name
          const exerciseId = Exercise.id
          const exerciseElement = createExerciseElement(exerciseName, id, setsDetails, exerciseId)
          const container = document.createElement('div')

          container.classList.add('mb-3')
          container.appendChild(exerciseElement)
          editListForm.appendChild(container)
        })
      } else {
        const noExerciseMessage = document.createElement('p')
        noExerciseMessage.textContent = '請先新增動作到菜單'
        editListForm.appendChild(noExerciseMessage)
      }
    }
  } else if (event.target.classList.contains('delete-list')) {
    const listId = event.target.getAttribute('data-list-id')
    const exerciseName = event.target.getAttribute('data-exercise-name')
    confirmDelete(exerciseName, listId)
  // 綁定加入日程button的data-list-id
  } else if (event.target.classList.contains('add-date')) {
    const listId = event.target.getAttribute('data-list-id')
    saveDateButton.setAttribute('data-list-id', listId)
  }
})

// 確認刪除List
function confirmDelete (exerciseName, listId) {
  const confirmation = confirm(`確定要刪除"${exerciseName}"嗎？`)

  if (confirmation) {
    fetch(`/api/exerciseLists/${listId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          window.location.reload()
        } else {
          console.error('刪除失敗')
        }
      })
      .catch(error => {
        console.error(error)
      })
  }
}

// 創建modal內的內容
function createExerciseElement (exerciseName, exerciseListId, setsDetails, exerciseId) {
  const exerciseElement = document.createElement('div')
  exerciseElement.classList.add('exercise-container')
  exerciseElement.setAttribute('exercise-detail-id', exerciseListId)
  exerciseElement.setAttribute('exercise-id', exerciseId)
  // 運動標題
  const pElement = createTextElement('p', exerciseName)
  pElement.id = 'exerciseName'
  pElement.name = 'exerciseName'
  pElement.style.fontSize = '24px'

  // 創建欄位中文
  const labelContainer = document.createElement('div')
  labelContainer.classList.add('label-container')

  const weightLabel = createLabel('重量')
  const repetitionsLabel = createLabel('次數')
  const weightUnitLabel = createLabel('單位')

  labelContainer.appendChild(weightLabel)
  labelContainer.appendChild(repetitionsLabel)
  labelContainer.appendChild(weightUnitLabel)

  // 創建編輯內容
  const setsContainer = document.createElement('div')
  setsContainer.classList.add('sets-container')

  if (setsDetails) {
    setsDetails.forEach(setDetail => {
      const inputGroup = createInputGroup(setDetail.weight, setDetail.repetitions, setDetail.weight_unit)
      setsContainer.appendChild(inputGroup)
    })
  } else {
    const inputGroup = createInputGroup()
    setsContainer.appendChild(inputGroup)
  }

  // 把 pElement、labelContainer和 setsContainer 加到 exerciseElement
  exerciseElement.appendChild(pElement)
  exerciseElement.appendChild(labelContainer)
  exerciseElement.appendChild(setsContainer)
  // 增加删除整個 exercise-container 的button
  const deleteExerciseButton = createDeleteExerciseButton(exerciseListId)
  exerciseElement.appendChild(deleteExerciseButton)
  // 創建 "Add Row" 按鈕
  const addButton = createAddButton(exerciseListId)
  // 將 "Add Row" 的button加到 setsContainer 內
  setsContainer.appendChild(addButton)
  return exerciseElement
}

// 創建刪除整個動作的按鈕
function createDeleteExerciseButton (exerciseListId) {
  const deleteExerciseButton = document.createElement('button')
  deleteExerciseButton.type = 'button'
  deleteExerciseButton.classList.add('btn', 'btn-danger', 'delete-exercise-button')
  deleteExerciseButton.textContent = '删除整個動作'
  deleteExerciseButton.setAttribute('data-exercise-detail-id', exerciseListId)

  return deleteExerciseButton
}

// 刪除整個動作的Listener
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('editListForm').addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-exercise-button')) {
      const exerciseListId = event.target.getAttribute('data-exercise-detail-id')
      deleteExerciseContainer(exerciseListId)
    }
  })
})

// 刪除整個動作function
function deleteExerciseContainer (exerciseListId) {
  const exerciseElement = document.querySelector(`[exercise-detail-id="${exerciseListId}"]`)

  if (exerciseElement) {
    // 查找並删除對應的 "Add Row" 按鈕
    const addButton = document.querySelector(`#addRowButton[data-exercise-detail-id="${exerciseListId}"]`)
    if (addButton) {
      addButton.remove()
    }

    exerciseElement.remove()
  }
}

// 創建欄位中文的函數
function createLabel (text) {
  const label = document.createElement('label')
  label.textContent = text
  label.classList.add('form-label')
  label.style.width = '30%'
  return label
}

// 創建標題的函數
function createTextElement (tagName, textContent) {
  const element = document.createElement(tagName)
  element.textContent = textContent
  return element
}

// 創建輸入框的函數
function createInputGroup (weight = '', repetitions = '', weightUnit = '') {
  const inputGroup = document.createElement('div')
  inputGroup.classList.add('input-group', 'mb-3')

  const weightInput = createInput('text', 'Weight', 'weight', weight)
  const repetitionsInput = createInput('text', 'Repetitions', 'repetitions', repetitions)

  const weightUnitSelect = createSelect('Weight Unit', weightUnit)
  weightUnitSelect.addEventListener('change', event => {
    weightUnit = event.target.value
  })

  inputGroup.appendChild(weightInput)
  inputGroup.appendChild(repetitionsInput)
  inputGroup.appendChild(weightUnitSelect)

  // 添加删除button
  const deleteButton = createDeleteButton()
  inputGroup.appendChild(deleteButton)

  return inputGroup
}

// 創建刪除button的函數
function createDeleteButton () {
  const deleteButton = document.createElement('button')
  deleteButton.type = 'button'
  deleteButton.classList.add('btn', 'btn-danger', 'delete-row-button')
  deleteButton.textContent = '删除'

  return deleteButton
}
// 刪除單行的Listener
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('editListForm').addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-row-button')) {
      const inputGroup = event.target.closest('.input-group')
      if (inputGroup) {
        inputGroup.remove()
      }
    }
  })
})

// 創建kg、lb的選項
function createSelect (placeholder, selectedValue) {
  const select = document.createElement('select')
  select.classList.add('form-control')
  select.name = 'weightUnit'

  const optionKg = document.createElement('option')
  optionKg.value = '公斤'
  optionKg.text = '公斤'
  if (selectedValue === '公斤') {
    optionKg.selected = true
  }

  const optionLb = document.createElement('option')
  optionLb.value = '磅'
  optionLb.text = '磅'
  if (selectedValue === '磅') {
    optionLb.selected = true
  }

  select.appendChild(optionKg)
  select.appendChild(optionLb)

  return select
}

// 創建輸入框Input元素
function createInput (type, placeholder, name, value = '') {
  const input = document.createElement('input')
  input.type = type
  input.placeholder = placeholder
  input.name = name
  input.value = value
  input.classList.add('form-control')
  return input
}

// 創建多一行的按鈕
function createAddButton (exerciseListId) {
  const addButtonContainer = document.createElement('div')
  addButtonContainer.classList.add('float-end')

  const addButton = document.createElement('button')
  addButton.type = 'button'
  addButton.id = 'addRowButton'
  addButton.setAttribute('data-exercise-detail-id', exerciseListId)
  addButton.classList.add('btn', 'btn-outline-info', 'add-row')
  addButton.textContent = '+新增一行'

  addButtonContainer.appendChild(addButton) // 添加到 addButtonContainer 中

  return addButtonContainer
}

// 產生一行空白輸入框
document.getElementById('editListForm').addEventListener('click', event => {
  const target = event.target
  if (target.classList.contains('add-row')) {
    createInputRow(event)
  }
})

// 產生一行輸入框的函數
function createInputRow (event) {
  const exerciseListId = event.target.getAttribute('data-exercise-detail-id')
  const exerciseElement = document.querySelector(`[exercise-detail-id="${exerciseListId}"]`)

  if (exerciseElement) {
    const newInputGroup = createInputGroup()
    const floatEndContainer = exerciseElement.querySelector('.float-end')

    floatEndContainer.parentNode.insertBefore(newInputGroup, floatEndContainer)
  }
}

// 發送表單到後端API
editListButton.addEventListener('click', function (event) {
  event.preventDefault()
  const listId = event.target.getAttribute('data-list-id')
  const formData = {
    exercises: [] // 儲存動作數據
  }

  // 獲取所有 exercise-container 元素
  const exerciseContainers = document.querySelectorAll('.exercise-container')

  exerciseContainers.forEach(exerciseContainer => {
    const exerciseData = {
      exerciseId: exerciseContainer.getAttribute('exercise-id'),
      setsDetails: [] // 存儲每個組的數據
    }

    // 獲取每個組的數據
    const inputGroups = exerciseContainer.querySelectorAll('.input-group')

    inputGroups.forEach(inputGroup => {
      const weight = inputGroup.querySelector('input[name="weight"]').value
      const repetitions = inputGroup.querySelector('input[name="repetitions"]').value
      const weightUnit = inputGroup.querySelector('select[name="weightUnit"]').value

      // 將每個組的數據添加到 exerciseData
      exerciseData.setsDetails.push({
        weight,
        repetitions,
        weight_unit: weightUnit
      })
    })

    // 將每個動作的數據添加到 formData
    formData.exercises.push(exerciseData)
  })
  fetch(`/api/exerciseListDetail/${listId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => {
      if (response.ok) {
        localStorage.setItem('successMessage', '更新成功')
        window.location.href = '/exerciseLists'
      } else {
        alert('新增失敗')
      }
    })
    .catch(error => {
      console.error(error)
    })
})

// 監聽取消按鈕的點擊事件
const confirmCancel = document.getElementById('confirmCancel')
const cancelButton = document.getElementById('cancelButton')
cancelButton.addEventListener('click', function (event) {
  event.preventDefault()
  $('#cancelWarningModal').modal('show')
})
confirmCancel.addEventListener('click', function () {
  $('#cancelWarningModal').modal('hide')
  window.location.href = '/exerciseLists'
})

// 顯示提示內容
document.addEventListener('DOMContentLoaded', function () {
  const successMessage = localStorage.getItem('successMessage')

  if (successMessage) {
    alert(successMessage)
    localStorage.removeItem('successMessage')
  }
})
