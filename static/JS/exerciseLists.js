async function getExerciseLists () {
  const listCards = document.querySelector('.listContent .row')
  const response = await fetch('/api/exerciselists')
  const lists = await response.json()
  console.log(lists)
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
        <div class="card border-primary mb-3" style="max-width: 18rem;">
          <div class="card-body text-primary">
            <h5 class="card-title">${lists.find(list => list.id === parseInt(listId)).name}</h5>
            <p class="card-text">${exerciseIdList}</p>
          </div>
        </div>
      `
    }
  }
}

getExerciseLists()
