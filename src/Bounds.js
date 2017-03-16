import Rect from './Rect'
import Point from './Point'

export default class Bounds {

  constructor (t = 0, r = 0, b = 0, l = 0) {
    this.t = t
    this.r = r
    this.b = b
    this.l = l
  }

  add (t = 0, r = 0, b = 0, l = 0) {
    const bounds = Bounds.create(this, arguments)
    if (bounds.t < this.t) {
      this.t = bounds.t
    }
    if (bounds.r > this.r) {
      this.r = bounds.r
    }
    if (bounds.b > this.b) {
      this.b = bounds.b
    }
    if (bounds.l < this.l) {
      this.l = bounds.l
    }
    return this
  }

  expand (t = 0, r = 0, b = 0, l = 0) {
    const bounds = Bounds.create.apply(this, arguments)
    this.t += bounds.t
    this.r += bounds.r
    this.b += bounds.b
    this.l += bounds.l
    return this
  }

  move (x = 0, y = 0) {
    const point = Point.create.apply(this, arguments)
    this.t += point.y
    this.r += point.x
    this.b += point.y
    this.l += point.x
    return this
  }

  moveTo (x = 0, y = 0) {
    const to = Point.create.apply(this, arguments)
    const dx = to - this.l
    const dy = to - this.t
    this.t += dy
    this.r += dx
    this.b += dy
    this.l += dx
    return this
  }

  rect () {
    return new Rect(this.r - this.l, this.b - this.t, this.l, this.t)
  }

}

Bounds.create = function (t = 0, r = 0, b = 0, l = 0) {
  if (arguments.length === 1) {
    return t instanceof Bounds
      ? new Bounds(t.t, t.r, t.b, t.l)
      : t instanceof Rect
        ? new Bounds(t.y, t.x + t.w, t.y + t.h, t.x)
        : new Bounds(t, t, t, t)
  }
  return new Bounds(t, r, b, l)
}
