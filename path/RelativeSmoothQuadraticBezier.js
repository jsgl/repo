
jsgl.path.RelativeSmoothQuadraticBezier = function(x, y) {

  jsgl.path.AbstractSmoothQuadraticBezier.call(this, x || 0, y || 0);
}
jsgl.path.RelativeSmoothQuadraticBezier.jsglExtend(
  jsgl.path.AbstractSmoothQuadraticBezier);

jsgl.path.RelativeSmoothQuadraticBezier.prototype.toSvgCommand = function() {

  return "t" + this.endPoint.X + "," + this.endPoint.Y;
}

jsgl.path.RelativeSmoothQuadraticBezier.prototype.toVmlCommand = function(pathHistory) {

  var newCtlPoint = new jsgl.Vector2D(
    pathHistory.currLoc.X - pathHistory.lastQBCtl.X,
    pathHistory.currLoc.Y - pathHistory.lastQBCtl.Y);
  
  return "v" + ((2*newCtlPoint.X)/3).jsglVmlize() +
         "," + ((2*newCtlPoint.Y)/3).jsglVmlize() +
         "," + ((2*newCtlPoint.X + this.endPoint.X)/3).jsglVmlize() +
         "," + ((2*newCtlPoint.Y + this.endPoint.Y)/3).jsglVmlize() +
         "," + (this.endPoint.X).jsglVmlize() +
         "," + (this.endPoint.Y).jsglVmlize();
}

jsgl.path.RelativeSmoothQuadraticBezier.prototype.getNewLocation = function(pathHistory) {

  return pathHistory.currLoc.add(this.endPoint);
}

jsgl.path.RelativeSmoothQuadraticBezier.prototype.getQBControlPoint = function(pathHistory) {

  return new jsgl.Vector2D(
    2*pathHistory.currLoc.X - pathHistory.lastQBCtl.X,
    2*pathHistory.currLoc.Y - pathHistory.lastQBCtl.Y);
}