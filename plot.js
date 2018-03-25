class Plot {
  constructor (canvasName, width, height) {
    this.canvasName = canvasName;
    this.canvas = document.getElementById(this.canvasName).getContext("2d");

    this.width = width;
    this.height = height;

    this.values = [];

    this.maxValue = 1;

    this.DrawLayout();
  }

  Clear () {
    this.canvas.clearRect(0, 0, this.width, this.height);
  }

  DrawLayout () {
    this.canvas.moveTo(0, this.height/2);
    this.canvas.lineTo(this.width, this.height/2);
    //this.canvas.stroke();
  }

  DrawPoint (n) {
    let xPerv = (n - 1 - this.values.length) * frequency/3 * this.width + this.width*4/5;
    let yPerv = this.height/2 - this.values[n-1] * this.height/2 / this.maxValue;

    let x = (n - this.values.length) * frequency/3 * this.width + this.width*4/5;
    let y = this.height/2 - this.values[n] * this.height/2 / this.maxValue;

    // old style - circles
    // let x = (n - this.values.length) * frequency/3 * this.width + this.width*4/5;
    // let y = this.height/2 - this.values[n] * this.height/2 / this.maxValue;
    // this.canvas.beginPath();
    // this.canvas.arc(x, y, 2, 0, 2*Math.PI); // x y r angle_begin angle_end

    this.canvas.moveTo(xPerv, yPerv);
    this.canvas.lineTo(x, y);

  }

  Redraw () {
    this.canvas.beginPath();
    this.Clear();
    this.DrawLayout();

    for (var i = 1; i < this.values.length; i++) {
      this.DrawPoint(i);
    }
    this.canvas.stroke();

  }

  AddPoint (value) {
    this.values.push(value);

    if (Math.abs(value) > this.maxValue) {
      this.maxValue = Math.abs(value);
    }

    this.Redraw();
  }

}
