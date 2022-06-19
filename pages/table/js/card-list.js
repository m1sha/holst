function createCardList () {
  const el = document.getElementById('card-list')

  const createCard = ({ header, content }) => {
    const html = ({ header, content }) => `
      <div class='equipment-header'>${header}</div>
      <div class='equipment-content'>${content}</div>
    `
    const div = document.createElement('div')
    div.classList.add('equipment-card')
    div.draggable = true
    div.innerHTML = html({ header, content })
    div.ondragstart = e => {
      e.dataTransfer.setData('text/plain', header)
    }
    return div
  }

  const equipmentCards = [{
    header: 'Equipment 752006',
    content: '<b>Some info</b>'
  },
  {
    header: 'Equipment 252006',
    content: '<b>Some info</b>'
  },
  {
    header: 'Equipment 32112',
    content: '<b>Some info</b>'
  },
  {
    header: 'Equipment 56112',
    content: '<b>Some info</b>'
  },
  {
    header: 'Equipment 99814',
    content: '<b>Some info</b>'
  }]

  for (const c of equipmentCards) {
    const card = createCard(c)
    el.appendChild(card)
  }
}

createCardList()
