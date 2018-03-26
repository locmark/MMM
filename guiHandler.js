var phase = 0;

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
        phase += 2*Math.PI*frequency/(sampleRate*simulationSpeed);
        return amplitude*Math.sin(phase);
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
  frequency = $("#frequency")[0].value;
}

function SetAmplitude () {
  amplitude = $("#amplitude")[0].value;
}

function UpdateMainLoopInterval () {
  clearInterval(mainLoop);
  mainLoop = setInterval(Step, 1000/sampleRate);
}

function SetSampleRate () {
  sampleRate = $("#sampleRate")[0].value;
  UpdateMainLoopInterval();
}

function SetSimulationSpeed (){
  simulationSpeed = $("#simulationSpeed")[0].value;
}
