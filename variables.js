var time = 0;

var C1 = 1;   // [F]
var C2 = 2;   // [F]
var R1 = 1;   // [ohm]
var R2 = 2;   // [ohm]

var amplitude = 1;
var frequency = 0.01;

var inputSignal = function () {
  return amplitude*Math.sin(2*Math.PI*frequency*time);
}


var AMatrix;
var BMatrix;
var XMatrix;
var XDMatrix;
var UMatrix;
