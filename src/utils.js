export const oToA = (o) => {
  if (!(o instanceof Object)) {
    return
  }
  try {
    return Object.keys(o).map(k => o[k])
  } catch (e) {
    return []
  }
}

export const aToO = (a, k) => {
  if (!(a instanceof Array) || !k) {
    return
  }
  let r = {}
  a.forEach(o => {
    r[o[k]] = o
  })

  return r
}
