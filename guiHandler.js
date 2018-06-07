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
        phase += 2*Math.PI*frequency*simulationSpeed/sampleRate;
        return amplitude*Math.sin(phase);
      }
      break;
    case "square":
    inputSignal = function () {
      let T = 1/frequency;
      t = time % T;
      if (t < T/2)
        return amplitude;
      else
        return amplitude * (-1);
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

function PrefixHandler(str) {
  let value = 0;
  let dotPosition = 0;
  for (let i = 0; i < str.length; i++) {
    var c = str.charAt(i);
    switch (c) {
      case 'G':
        value *= 1000000000;
        break;
      case 'M':
        value *= 1000000;
        break;
      case 'k':
        value *= 1000;
        break;
      case 'm':
        value /= 1000;
        break;
      case 'u':
        value /= 1000000;
        break;
      case 'n':
        value /= 1000000000;
        break;
      case 'p':
        value /= 1000000000000;
        break;
      case '.' :
      case ',' :
        dotPosition = 10;
        break;
      default:
        if (dotPosition != 0)
        {
          value += Number(c) / dotPosition;
          dotPosition *= 10;
        } else {
          value = value * 10 + Number(c);
        }
    }
  }
  return value;
}

function SetFrequency () {
  frequency = PrefixHandler($("#frequency")[0].value);
}

function SetAmplitude () {
  amplitude = PrefixHandler($("#amplitude")[0].value);
}

function RestartSimulation() {
    time = 0;
    phase = 0;
    plot1.ClearAndDelete()
    plot2.ClearAndDelete();
    inputPlot.ClearAndDelete()
    InitMatrices();
}

function UpdateMainLoopInterval () {
  clearInterval(mainLoop);
  mainLoop = setInterval(Step, 1000/sampleRate);
}

function SetSampleRate () {
  sampleRate = PrefixHandler($("#sampleRate")[0].value);
  UpdateMainLoopInterval();
}

function SetSimulationSpeed (){
  simulationSpeed = PrefixHandler($("#simulationSpeed")[0].value);
}

function SetC1() {
    if (PrefixHandler($("#C1")[0].value) <= 0) {
        window.alert("Value has to be positive!");
    }
    else {
        C1 = PrefixHandler($("#C1")[0].value);
        AMatrix = CalcAMatrix(); //recalculate matrices dependent on Rx/Cx after any change
        BMatrix = CalcBMatrix();
    }
}

function SetC2() {
    if (PrefixHandler($("#C2")[0].value) <= 0) {
        window.alert("Value has to be positive!");
    }
    else {
        C2 = PrefixHandler($("#C2")[0].value);
        AMatrix = CalcAMatrix();
        BMatrix = CalcBMatrix();
    }
}

function SetR1() {
    if (PrefixHandler($("#R1")[0].value) <= 0) {
        window.alert("Value has to be positive!");
    }
    else {
        R1 = PrefixHandler($("#R1")[0].value);
        AMatrix = CalcAMatrix();
        BMatrix = CalcBMatrix();
    }
}
function SetR2() {
    if (PrefixHandler($("#R2")[0].value) <= 0) {
        window.alert("Value has to be positive!");
    }
    else {
        R2 = PrefixHandler($("#R2")[0].value);
        AMatrix = CalcAMatrix();
        BMatrix = CalcBMatrix();
    }
}
