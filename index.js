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
    return [[Math.cos(2*Math.PI*0.02*time)]];
  }

  function CalcXDMatrix(){
    let AX = AMatrix.Multiply(XMatrix);
    let BU = BMatrix.Multiply(UMatrix);

    return AX.Add(BU);
  }

  let plot1 = new Plot("plot1", 800, 600);

  function Step(){
    UMatrix = CalcUMatrix();
    XDMatrix = CalcXDMatrix();
    XDMatrix.Scale(1/10);
    XMatrix = XMatrix.Add(XDMatrix);  // very simple integration, by adding dX/dt to X (assuming that base was 1/10[second])
    plot1.AddPoint(XMatrix[0][0]);
    plot1.DrawLastPoint();
    time++;
  }

  setInterval(Step, 100);
}
