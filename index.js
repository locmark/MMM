window.onload = function () {


  // initialization
  AMatrix = CalcAMatrix();
  BMatrix = CalcBMatrix();
  XMatrix = [[0],[0]];
  XDMatrix = [[0],[0]];
  UMatrix = CalcUMatrix();

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
    return [[inputSignal()]];
  }

  function CalcXDMatrix(){
    let AX = AMatrix.Multiply(XMatrix);
    let BU = BMatrix.Multiply(UMatrix);

    return AX.Add(BU);
  }

  let plot1 = new Plot("plot1", 800, 600);
  let plot2 = new Plot("plot2", 800, 600);
  let inputPlot = new Plot("inputPlot", 800, 600);

  function Step(){
    UMatrix = CalcUMatrix();
    inputPlot.AddPoint(UMatrix[0][0]);
    XDMatrix = CalcXDMatrix();
    XDMatrix.Scale(1/10);
    XMatrix = XMatrix.Add(XDMatrix);  // very simple integration, by adding dX/dt to X (assuming that base was 1/10[second])
    plot1.AddPoint(XMatrix[0][0]);
    plot2.AddPoint(XMatrix[1][0]);
    time++;
  }

  SetInputSignal();
  setInterval(Step, 100);
}
