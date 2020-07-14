
export class Tag {
  private type
  public el: Element
  public range?: Range

  constructor (type = 'none', range?: Range) {
    this.el = document.createElement('mark')
    this.el.classList.add(type)
    this.range = range
    this.type = type
  }

  setType (type: string) {
    this.el.classList.replace(this.type, type)
    this.type = type
  }
}
