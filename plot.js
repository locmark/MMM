class Plot {
  constructor (canvasName, width, height) {
    this.canvasName = canvasName;
    this.canvas = document.getElementById(this.canvasName).getContext("2d");

    this.width = width;
    this.height = height;

    this.values = [];

    this.maxValue = 1;
    this.maxArg = 10;

    this.DrawLayout();
  }

  DrawLayout () {
    this.canvas.moveTo(0, this.height/2);
    this.canvas.lineTo(this.width, this.height/2);
    this.canvas.stroke();
  }

  DrawPoint (n) {
    let x = n * this.width / this.maxArg;
    let y = this.height/2 - this.values[n] * this.height/2 / this.maxValue;

    this.canvas.beginPath();
    this.canvas.arc(x, y, 2, 0, 2*Math.PI); // x y r angle_begin angle_end
    this.canvas.stroke();
  }

  DrawLastPoint () {
    this.DrawPoint(this.values.length - 1);
  }

  AddPoint (value) {
    this.values.push(value);

    if (this.values.length > this.maxArg)
      this.maxArg += 10;

    this.DrawLastPoint();
  }

}
