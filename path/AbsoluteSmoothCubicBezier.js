
jsgl.path.AbsoluteSmoothCubicBezier = function(controlX, controlY, endX, endY) {

  jsgl.path.AbstractSmoothCubicBezier.call(
    this, controlX || 0, controlY || 0, endX || 0, endY || 0);
}
jsgl.path.AbsoluteSmoothCubicBezier.jsglExtend(
  jsgl.path.AbstractSmoothCubicBezier);

jsgl.path.AbsoluteSmoothCubicBezier.prototype.toSvgCommand = function() {

  return "S" + this.controlPoint.X + "," + this.controlPoint.Y +
         "," + this.endPoint.X + "," + this.endPoint.Y;
}

jsgl.path.AbsoluteSmoothCubicBezier.prototype.toVmlCommand = function(pathHistory) {

  var newCtlPoint = new jsgl.Vector2D(
    2*pathHistory.currLoc.X - pathHistory.lastCBCtl.X,
    2*pathHistory.currLoc.Y - pathHistory.lastCBCtl.Y);

  return "c" + (newCtlPoint.X).jsglVmlize() + "," + (newCtlPoint.Y).jsglVmlize() +
         "," + (this.controlPoint.X).jsglVmlize() + "," + (this.controlPoint.Y).jsglVmlize() +
         "," + (this.endPoint.X).jsglVmlize() + "," + (this.endPoint.Y).jsglVmlize();
}

jsgl.path.AbsoluteSmoothCubicBezier.prototype.getNewLocation = function(pathHistory) {

  return jsgl.cloneObject(this.endPoint);
}

jsgl.path.AbsoluteSmoothCubicBezier.prototype.getCBControlPoint = function(pathHistory) {

  return jsgl.cloneObject(this.controlPoint);
}