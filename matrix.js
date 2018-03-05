//
//    new solution - matrix class
//

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

  get height () { return this._h }
  get width () { return this._w }
  getV (x, y) { return this._values[x][y] }
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

//
//    temporary solution - add methods to array class
//

function Array2d(y, x) {
  let result = [];
  for (var i = 0; i < y; i++) {
    result.push(new Array(x));
  }
  return result.slice();
}



Array.prototype.Multiply = function(arr) {
  let result = Array2d(this.length, arr[0].length);

  for (var y = 0; y < result.length; y++) {
    for (var x = 0; x < result[0].length; x++) {
      result[y][x] = 0;
      for (var i = 0; i < arr.length; i++) {
        result[y][x] += this[y][i] * arr[i][x];
      }
    }
  }

  return result;
}

Array.prototype.Add = function(arr) {
  let result = Array2d(this.length, this[0].length);

  for (var y = 0; y < this.length; y++) {
    for (var x = 0; x < this[0].length; x++) {
      result[y][x] = this[y][x] + arr[y][x];
    }
  }
  return result;
}

Array.prototype.Scale = function(a) {
  for (var y = 0; y < this.length; y++) {
    for (var x = 0; x < this[0].length; x++) {
      this[y][x] *= a;
    }
  }
}
