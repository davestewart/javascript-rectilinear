export default class Point {

  construct (x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  add (x = 0, y = 0) {
    const point = Point.create.apply(this, arguments)
    this.x += point.x
    this.y += point.y
    return this
  }

  subtract (x = 0, y = 0) {
    const point = Point.create.apply(this, arguments)
    this.x -= point.x
    this.y -= point.y
    return this
  }

  move (x = 0, y = 0) {
    return this.add.apply(this, arguments)
  }

  moveTo (x = 0, y = 0) {
    const point = Point.create.apply(this, arguments)
    this.x = point.x
    this.y = point.y
    return this
  }

}

Point.create = function (x = 0, y = 0) {
  if (x instanceof Point) {
    return new Point(x.x, x.y)
  }
  return new Point(x, y)
}

