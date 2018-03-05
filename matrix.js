class Matrix {
  constructor (x, y) {
    this._x = x
    this._h = y
    this._values = []
    for (let i = 0; i < y; i++) {
      this._values.push(new Array(x))
    }

    /* STRUCT
    [....],
    [....],
    [....],
    [....]

    */
  }

  height () { return this._h }
  width () { return this._w }
  getV (x, y) { return this.values[x][y] }
  setV (x, y, v) {
    this._values[x][y] = v;
  }
  getColumn (x) {
    let column = []
    for (let i = 0; i < this._y; i++) {
      column.push(this.getV(x, i))
    }
    return column
  }

  getRow (y) {
    return this._values[y].slice()
  }

  getValues () {
    return this._values
  }

  setColumn (x, column) {
    for (let i = 0; i < this._y; i++) {
      setV(x, i, column[i])
    }
  }

  setRow (y, row) {
    this._values[y] = row.slice()
  }

  static zero (x, y) {

  }

  static fromValues (v) {
    let y = v.length;
    let x = v[0].length;
    let values = v.map(row => row.slice())
    let newM = new Matrix(y, x)
    newM._values = values
    return newM
  }

  multiply (matrix) {
    return Matrix.multiply(this, matrix)
  }

  static multiply (m1, m2) {
    let newM = new Matrix(m2.width, m1.height)

    for (let x = 0; x < m2.width; x++) {
      for (let y = 0; y < m1.height; y++) {
        let column = m2.getColumn(x)
        let row = m1.getRow(y)
        let nVal = row.reduce((acc, el_row, i) => {acc + el_row * column[i]}, 0)
        newM.setV(x, y, nVal)
      }
    }

    return newM
  }

  add (matrix) {
    return Matrix.add(this, matrix)
  }

  static add (m1, m2) {
    let newM = new Matrix(m1.width, m1.height)

    for (let x = 0; x < m1.width; x++) {
      for (let y = 0; y < m1.height; y++) {
        newM.setV(x, y, m1.getV(x, y) + m2.getV(x, y))
      }
    }

    return newM
  }

  scale (scale) {
    return Matrix.scale(this, scale)
  }

  static scale (m1, scale) {
    let newM = new Matrix(m1.width, m1.height)

    for (let x = 0; x < m1.width; x++) {
      for (let y = 0; y < m1.height; y++) {
        newM.setV(x, y, m1.getV(x, y)  * scale)
      }
    }

    return newM
  }
}
