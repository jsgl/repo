
jsgl.path.RelativeSmoothCubicBezier = function(controlX, controlY, endX, endY) {

  jsgl.path.AbstractSmoothCubicBezier.call(
    this, controlX || 0, controlY || 0, endX || 0, endY || 0);
}
jsgl.path.RelativeSmoothCubicBezier.jsglExtend(
  jsgl.path.AbstractSmoothCubicBezier);

jsgl.path.RelativeSmoothCubicBezier.prototype.toSvgCommand = function() {

  return "s" + this.controlPoint.X + "," + this.controlPoint.Y +
         "," + this.endPoint.X + "," + this.endPoint.Y;
}

jsgl.path.RelativeSmoothCubicBezier.prototype.toVmlCommand = function(pathHistory) {

  var newCtlPoint = new jsgl.Vector2D(
    pathHistory.currLoc.X - pathHistory.lastCBCtl.X,
    pathHistory.currLoc.Y - pathHistory.lastCBCtl.Y);
  
  return "v" + (newCtlPoint.X).jsglVmlize() + "," + (newCtlPoint.Y).jsglVmlize() +
         "," + (this.controlPoint.X).jsglVmlize() + "," + (this.controlPoint.Y).jsglVmlize() +
         "," + (this.endPoint.X).jsglVmlize() + "," + (this.endPoint.Y).jsglVmlize();
}

jsgl.path.RelativeSmoothCubicBezier.prototype.getNewLocation = function(pathHistory) {

  return pathHistory.currLoc.add(this.endPoint);
}

jsgl.path.RelativeSmoothCubicBezier.prototype.getCBControlPoint = function(pathHistory) {

  return pathHistory.currLoc.add(this.controlPoint);
}