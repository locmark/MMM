class Plot {
  constructor (canvasName, canvasDescription, width, height) {
    this.canvasName = canvasName;
    this.canvas = $("#" + this.canvasName)[0].getContext("2d");

    this.canvas.font = "bold 12px Arial"

    this.canvasDescription = canvasDescription;

    this.width = width;
    this.height = height;

    this.values = [];

    this.maxValue = 0.5;

    this.DrawLayout();
  }

  Clear () {
      this.canvas.clearRect(0, 0, this.width, this.height);
  }

  ClearAndDelete() {
      this.maxValue = 1;
      this.canvas.clearRect(0, 0, this.width, this.height);
      this.values.splice(0, this.values.length);
  }

  DrawLayout () {
    this.canvas.moveTo(0, this.height/2);
    this.canvas.lineTo(this.width, this.height/2);

    this.canvas.fillText(Math.round(this.maxValue*10000)/10000, 5, 10);
    this.canvas.fillText("-" + Math.round(this.maxValue*10000)/10000, 5, 297);
  }


  DrawPoint (n) {
    let xPerv = (this.values[n-1].time - this.values[this.values.length - 1].time) * frequency/3 * this.width + this.width*4/5;
    let yPerv = this.height/2 - this.values[n-1].value * this.height/2 / this.maxValue;

    let x = (this.values[n].time - this.values[this.values.length - 1].time) * frequency/3 * this.width + this.width*4/5;
    let y = this.height/2 - this.values[n].value * this.height/2 / this.maxValue;

    this.canvas.moveTo(xPerv, yPerv);
    this.canvas.lineTo(x, y);

  }

  CalcMaxValue() {
    let max = 0;
    for (let i = 1; i < this.values.length; i++) {
      let val = Math.abs(this.values[i].value);
      if (!isNaN(val) && val > max) {
        max = val;
      }
    }
    this.maxValue = max;
  }

  Redraw() {


    this.canvas.beginPath();
    this.Clear();
    this.DrawLayout();

    let excess = this.values.length - (5 * sampleRate / (frequency * simulationSpeed));
    if (excess > 0) {
        this.values.splice(0, excess);
    }

    this.CalcMaxValue();

    for (var i = 1; i < this.values.length; i++) {
      this.DrawPoint(i);
    }
    this.canvas.stroke();
    this.canvas.fillText(this.canvasDescription, 10, 280);

  }

  AddPoint (value, time) {
    this.values.push({value: value, time: time});

    // if (Math.abs(value) > this.maxValue) {
    //   this.maxValue = Math.abs(value);
    // }
    this.Redraw();
  }

}
