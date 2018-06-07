function CalcAMatrix() {
    let a1 = -(R1 + R2) / (C1 * R1 * R2);
    let a2 = 1 / (C1 * R2);
    let a3 = 1 / (C2 * R2);
    let a4 = -1 / (C2 * R2);
    return [[a1, a2], [a3, a4]];
}

function CalcBMatrix() {
    return [[1 / (R1 * C1)], [0]];
}

function CalcUMatrix() {
    return [[inputSignal()]];
}

function CalcXDMatrix() {
    let AX = AMatrix.Multiply(XMatrix);
    let BU = BMatrix.Multiply(UMatrix);
    return AX.Add(BU);
}

function InitMatrices() {
    // initialization
    AMatrix = CalcAMatrix();
    BMatrix = CalcBMatrix();
    XMatrix = [[0], [0]];
    XDMatrix = [[0], [0]];
    UMatrix = CalcUMatrix();
}

window.onload = function () {
    
    InitMatrices();

    plot1 = new Plot("plot1","x1(t)", 400, 300);
    plot2 = new Plot("plot2","x2(t)", 400, 300);
    inputPlot = new Plot("inputPlot","u(t)", 400, 300);

  Step = function(){
    UMatrix = CalcUMatrix();
    XDMatrix = CalcXDMatrix();
    XDMatrix.Scale(simulationSpeed/sampleRate);
    XMatrix = XMatrix.Add(XDMatrix);  // very simple integration, by adding scaled dX/dt to X
    inputPlot.AddPoint(UMatrix[0][0], time);
    plot1.AddPoint(XMatrix[0][0], time);
    plot2.AddPoint(XMatrix[1][0], time);
    time += simulationSpeed/sampleRate;
  }

  SetInputSignal();
  mainLoop = setInterval(Step, 1000/sampleRate);
}
