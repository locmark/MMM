window.onload = function () {
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

    var time = 0;

    var C1 = 1;   // [F]
    var C2 = 2;   // [F]
    var R1 = 1;   // [ohm]
    var R2 = 2;   // [ohm]

    var AMatrix = CalcAMatrix();
    var BMatrix = CalcBMatrix();
    var XMatrix = [[0],[0]];
    var XDMatrix = [[0],[0]];
    var UMatrix = CalcUMatrix();

    function CalcAMatrix(){
      let a1 = -(R1+R2)/(C1*R1*R2);
      let a2 = 1/(C1*R2);
      let a3 = 1/(C2*R2);
      let a4 = -1/(C2*R2);
      return [[a1, a2],[a3, a4]];
    }

    function CalcBMatrix(){
      return [[1/(R1*C1)], [0]];
    }

    function CalcUMatrix(){
      return [[Math.cos(2*Math.PI*0.02*time)]];
    }

    function CalcXDMatrix(){
      let AX = AMatrix.Multiply(XMatrix);
      let BU = BMatrix.Multiply(UMatrix);

      return AX.Add(BU);
    }


    function DrawPlot1Step(){
      var c = document.getElementById("plot1");
      var ctx = c.getContext("2d");
      ctx.beginPath();
      ctx.arc(time*3,300 - XMatrix[0][0]*500,2,0,2*Math.PI);
      ctx.stroke();
    }

    function DrawPlot1() {
      var c = document.getElementById("plot1");
      var ctx = c.getContext("2d");
      ctx.moveTo(0,300);
      ctx.lineTo(800,300);
      ctx.stroke();
    }

    function Step(){
      UMatrix = CalcUMatrix();
      XDMatrix = CalcXDMatrix();
      XDMatrix.Scale(1/10);
      XMatrix = XMatrix.Add(XDMatrix);  // very simple integration, by adding dX/dt to X (assuming that base was 1[second])
      DrawPlot1Step();
      time++;
    }

    DrawPlot1();
    setInterval(Step, 100);
}
