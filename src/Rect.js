import Bounds from './Bounds'
import Point from './Point'

export default class Rect {

  constructor (w = 0, h = 0, x = 0, y = 0) {
    this.w = w
    this.h = h
    this.x = x
    this.y = y
  }

  add (w = 0, h = 0, x = 0, y = 0) {
    const rect = Rect.create.apply(this, arguments)
    w = this.w
    h = this.h
    x = this.x
    y = this.y
    if (rect.x < x) {
      x = rect.x
    }
    if (rect.y < y) {
      y = rect.y
    }
    if (x + rect.w > this.x + this.w) {
      w = x + rect.w
    }
    if (y + rect.h > this.y + this.h) {
      h = y + rect.h
    }
    this.x = x
    this.y = y
    this.h = h
    this.w = w
    return this
  }

  add2 (w = 0, h = 0, x = 0, y = 0) {
    const t = Bounds.create(this)
    const r = Bounds.create(Rect.create.apply(this, arguments))
    if (r.l < t.l) {
      this.x = r.l
    }
    if (r.t < t.t) {
      this.y = r.t
    }
    if (r.r > t.r) {
      this.w = r.r - this.x
    }
    if (r.b > t.b) {
      this.h = r.b - this.y
    }
    return this
  }

  expand (t = 0, r = 0, b = 0, l = 0) {
    const bounds = Bounds.create.apply(this, arguments)
    this.w += bounds.l + bounds.r
    this.h += bounds.t + bounds.b
    this.x -= bounds.l
    this.y -= bounds.t
    return this
  }

  move (x = 0, y = 0) {
    const point = Point.create.apply(this, arguments)
    this.x += point.x
    this.y += point.y
    return this
  }

  moveTo (x = 0, y = 0) {
    const point = Point.create.apply(this, arguments)
    this.x = point.x
    this.y = point.y
    return this
  }

  bounds () {
    return new Bounds(this.y, this.x + this.w, this.y + this.h, this.x)
  }

}

Rect.create = function (w = 0, h = 0, x = 0, y = 0) {
  if (w instanceof Rect) {
    return new Rect(w.w, w.h, w.x, w.y)
  }
  else if (w instanceof Bounds) {
    return w.rect()
  }
  return new Rect(w, h, x, y)
}
