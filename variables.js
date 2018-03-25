var time = 0;
var sampleRate = 10;
var simulationSpeed = 0.5;

var C1 = 1;   // [F]
var C2 = 2;   // [F]
var R1 = 1;   // [ohm]
var R2 = 2;   // [ohm]

var amplitude = 1;
var frequency = 0.01;

var inputSignal = function () {
  return amplitude*Math.sin(2*Math.PI*frequency*time/sampleRate);
}

var mainLoop;
var Step;

var AMatrix;
var BMatrix;
var XMatrix;
var XDMatrix;
var UMatrix;
