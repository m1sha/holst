const colors = ['#0c6d25', '#383025', '#2388a2', '#a4685c', '#1e247e', '#daa500', '#723405', '#a1a2a0']
export function getColor () {
  const index = Math.floor(Math.random() * colors.length)
  return colors[index]
}
export default colors
