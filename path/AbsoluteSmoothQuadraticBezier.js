
jsgl.path.AbsoluteSmoothQuadraticBezier = function(x, y) {

  jsgl.path.AbstractSmoothQuadraticBezier.call(this, x || 0, y || 0);
}
jsgl.path.AbsoluteSmoothQuadraticBezier.jsglExtend(
  jsgl.path.AbstractSmoothQuadraticBezier);

jsgl.path.AbsoluteSmoothQuadraticBezier.prototype.toSvgCommand = function() {

  return "T" + this.endPoint.X + "," + this.endPoint.Y;
}

jsgl.path.AbsoluteSmoothQuadraticBezier.prototype.toVmlCommand = function(pathHistory) {

  var newCtlPoint = new jsgl.Vector2D(
    2*pathHistory.currLoc.X - pathHistory.lastQBCtl.X,
    2*pathHistory.currLoc.Y - pathHistory.lastQBCtl.Y);

  return "c" + ((pathHistory.currLoc.X + 2*newCtlPoint.X)/3).jsglVmlize() +
         "," + ((pathHistory.currLoc.Y + 2*newCtlPoint.Y)/3).jsglVmlize() +
         "," + ((2*newCtlPoint.X + this.endPoint.X)/3).jsglVmlize() +
         "," + ((2*newCtlPoint.Y + this.endPoint.Y)/3).jsglVmlize() +
         "," + (this.endPoint.X).jsglVmlize() +
         "," + (this.endPoint.Y).jsglVmlize();
}

jsgl.path.AbsoluteSmoothQuadraticBezier.prototype.getNewLocation = function(pathHistory) {

  return jsgl.cloneObject(this.endPoint);
}

jsgl.path.AbsoluteSmoothQuadraticBezier.prototype.getQBControlPoint = function(pathHistory) {

  return newCtlPoint = new jsgl.Vector2D(
    2*pathHistory.currLoc.X - pathHistory.lastQBCtl.X,
    2*pathHistory.currLoc.Y - pathHistory.lastQBCtl.Y);
}