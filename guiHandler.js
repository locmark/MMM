function SetInputSignal(){
  signalName = $("#signalSelect")[0].value;
  switch (signalName) {
    case "step":
      inputSignal = function () {
        return amplitude;
      }
      break;
    case "sin":
      inputSignal = function () {
        return amplitude*Math.sin(2*Math.PI*frequency*time);
      }
      break;
    case "triangle":
      inputSignal = function () {
        let T = 1/frequency;
        t = time % T;
        if (t < T/2)
          return amplitude*(t*4/T - 1);
        else
          return amplitude*(-t*4/T + 3);
      }
      break;
    default:

  }
}

function SetFrequency () {
  input = $("#frequency")[0].value;
  frequency = input;
}

function SetAmplitude () {
  input = $("#amplitude")[0].value;
  amplitude = input;
}
