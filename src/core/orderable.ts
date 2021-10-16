export default interface Orderable {
  order: number
  after?: Orderable
  before?: Orderable
}
