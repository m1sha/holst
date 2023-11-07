export class HtmlHandlers {
  private hoveredIds: string[] = []
  private enteredIds: string[] = []

  click (e: MouseEvent) {
    this.applyEvent(e, el => el.click())
  }

  hover (e: MouseEvent) {
    this.clearHover()
    this.applyEvent(e, el => {
      if ((el as any).obj.disabled) return
      el.classList.add('hover')
      this.hoveredIds.push(el.id)
    })
  }

  enter (e: MouseEvent) {
    this.leaveAll()
    this.applyEvent(e, el => {
      el.dispatchEvent(new MouseEvent('mouseenter'))
      this.enteredIds.push(el.id)
    })
  }

  // leave (e: MouseEvent) {
  //   this.applyEvent(e, el => el.dispatchEvent(new MouseEvent('mouseleave')))
  // }

  private clearHover () {
    this.hoveredIds.forEach(id => document.getElementById(id)?.classList.remove('hover'))
    this.hoveredIds = []
  }

  private leaveAll () {
    this.enteredIds.forEach(id => {
      const el = document.getElementById(id)
      if (!el) {
        console.error('getElementById is not found id: ', id)
        return
      }

      const obj = (el as any)?.obj
      if (!obj) return
      if (!obj.onLeave) return

      el.dispatchEvent(new MouseEvent('mouseleave'))
    })
    this.enteredIds = []
  }

  private applyEvent (e: MouseEvent, callback: (el: HTMLElement) => void) {
    const els = document.elementsFromPoint(e.x, e.y) as HTMLElement[]
    for (const el of els) {
      if (el.style.display === 'none') continue
      if (!el.classList.contains('holst-btn')) continue

      callback(el)
    }
  }
}
