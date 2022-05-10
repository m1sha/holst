const chooseFileBtn = byId('chooseFileBtn')
const fileInput = byId('file')
const imageView = byId('img')
const imageView2 = byId('img2')
const canvas = byId('canvas')
const table = byId('table')
const spinner = byId('spinner')
const content = byId('content')
const customRange = byId('customRange')
const colorCounter = byId('colorCounter')
const valueCounter = byId('value')
const getPalette = eval('demo.getPalette')
const whiteColor = eval('demo.whiteColor()')

showLoading(false)
showContent(false)

valueCounter.textContent = customRange.value

chooseFileBtn.onclick = function () { fileInput.click() }

fileInput.onchange = function () {
  if (!fileInput.files) return
  const reader = new FileReader()
  showLoading(true)
  const file = fileInput.files[0]
  if (!file) return
  reader.readAsDataURL(file)
  reader.onload = function () {
    imageView.style.opacity = '1'
    imageView.src = reader.result
    imageView.onload = function () {
      const result = getPalette(imageView, canvas, customRange.value)
      imageView2.src = result.image
      drawPalette(result.list)
    }
    imageView.onerror = function () {
      alert("Error: image hasn't loaded")
    }
  }
  reader.onerror = function () {
    alert("Error: file hasn't loaded")
  }
}

customRange.onchange = function () {
  valueCounter.textContent = customRange.value
  const result = getPalette(imageView, canvas, customRange.value)
  imageView2.src = result.image
  drawPalette(result.list)
}

function drawPalette (data) {
  showLoading(true)
  table.innerHTML = ''

  for (let i = 0; i < data.length; i++) {
    const color = data[i]
    const div = document.createElement('div')
    div.innerHTML = color.toString() // + '<br />' + color.toHSV().toString()
    div.style.backgroundColor = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + color.a + ')'
    div.style.color = color.getContrastRatio(whiteColor, true) > 4 ? '#fff' : '#000'
    table.appendChild(div)
  }
  colorCounter.textContent = data.length

  showLoading(false)
  showContent(true)
}

function showContent (value) {
  content.style.opacity = value ? '1' : '0'
}

function showLoading (value) {
  spinner.style.display = value ? 'flex' : 'none'
}

function byId (id) {
  return document.getElementById(id)
}
