getExerciseLists()

// 取得exerciseList內容
async function getExerciseLists () {
  const listCards = document.querySelector('.listContent .row')
  const response = await fetch('/api/exerciselists')
  const lists = await response.json()
  const displayedListExercises = {}
  lists.forEach(list => {
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
      listCards.innerHTML += `
        <div class="card mb-3" style="max-width: 18rem;">
          <div class="card-body text-primary">
            <h5 class="card-title">${lists.find(list => list.id === parseInt(listId)).name}</h5>
            <p class="card-text">${exerciseIdList}</p>
          </div>
        </div>
      `
    }
  }
}

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

document.addEventListener('DOMContentLoaded', function () {
  const successMessage = localStorage.getItem('successMessage')

  if (successMessage) {
    alert(successMessage)
    localStorage.removeItem('successMessage')
  }
})
