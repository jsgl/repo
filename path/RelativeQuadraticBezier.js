
jsgl.path.RelativeQuadraticBezier = function(controlX, controlY, endX, endY) {

  jsgl.path.AbstractQuadraticBezier.call(
    this, controlX || 0, controlY || 0, endX || 0, endY || 0);
}
jsgl.path.RelativeQuadraticBezier.jsglExtend(
  jsgl.path.AbstractQuadraticBezier);

jsgl.path.RelativeQuadraticBezier.prototype.toSvgCommand = function() {

  return "q" + this.controlPoint.X + "," + this.controlPoint.Y +
         "," + this.endPoint.X + "," + this.endPoint.Y;
}

jsgl.path.RelativeQuadraticBezier.prototype.toVmlCommand = function(pathHistory) {

  /* 'qb' path command does not work on MSIE */
  return "c" + (pathHistory.currLoc.X + (2*this.controlPoint.X)/3).jsglVmlize() +
         "," + (pathHistory.currLoc.Y + (2*this.controlPoint.Y)/3).jsglVmlize() +
         "," + (pathHistory.currLoc.X + (2*this.controlPoint.X + this.endPoint.X)/3).jsglVmlize() +
         "," + (pathHistory.currLoc.Y + (2*this.controlPoint.Y + this.endPoint.Y)/3).jsglVmlize() +
         "," + (pathHistory.currLoc.X + this.endPoint.X).jsglVmlize() +
         "," + (pathHistory.currLoc.Y + this.endPoint.Y).jsglVmlize();
}

jsgl.path.RelativeQuadraticBezier.prototype.getNewLocation = function(pathHistory) {

  return pathHistory.currLoc.add(this.endPoint);
}

jsgl.path.RelativeQuadraticBezier.prototype.getQBControlPoint = function(pathHistory) {

  return pathHistory.currLoc.add(this.controlPoint);
}