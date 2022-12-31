const HTML = {
  div: (className: string) => {
    const r = document.createElement('div')
    r.className = className
    return r
  },
  i: (className: string) => {
    const r = document.createElement('i')
    r.className = className
    return r
  },
  p: (content: string) => {
    const r = document.createElement('p')
    r.textContent = content
    return r
  },
  a: () => {
    const r = document.createElement('a')
    r.href = 'javascript::void(0)'
    return r
  },
  click: (el: HTMLElement, callback: () => void) => {
    el.addEventListener('click', () => callback())
  },
  removeClick: (el: HTMLElement) => {
    el.removeEventListener('click', el.click)
  },
  child: (parent: HTMLElement, child: HTMLElement) => {
    parent.append(child)
  }
}

export default HTML
