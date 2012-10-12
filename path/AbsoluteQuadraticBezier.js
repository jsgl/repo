
jsgl.path.AbsoluteQuadraticBezier = function(controlX, controlY, endX, endY) {

  jsgl.path.AbstractQuadraticBezier.call(
    this, controlX || 0, controlY || 0, endX || 0, endY || 0);
}
jsgl.path.AbsoluteQuadraticBezier.jsglExtend(
  jsgl.path.AbstractQuadraticBezier);

jsgl.path.AbsoluteQuadraticBezier.prototype.toSvgCommand = function() {

  return "Q" + this.controlPoint.X + "," + this.controlPoint.Y +
         "," + this.endPoint.X + "," + this.endPoint.Y;
}

jsgl.path.AbsoluteQuadraticBezier.prototype.toVmlCommand = function(pathHistory) {

  /* 'qb' path command does not work on MSIE */
  return "c" + ((pathHistory.currLoc.X + 2*this.controlPoint.X)/3).jsglVmlize() +
         "," + ((pathHistory.currLoc.Y + 2*this.controlPoint.Y)/3).jsglVmlize() +
         "," + ((2*this.controlPoint.X + this.endPoint.X)/3).jsglVmlize() +
         "," + ((2*this.controlPoint.Y + this.endPoint.Y)/3).jsglVmlize() +
         "," + (this.endPoint.X).jsglVmlize() +
         "," + (this.endPoint.Y).jsglVmlize();
}

jsgl.path.AbsoluteQuadraticBezier.prototype.getNewLocation = function(pathHistory) {

  return jsgl.cloneObject(this.endPoint);
}

jsgl.path.AbsoluteQuadraticBezier.prototype.getQBControlPoint = function(pathHistory) {

  return jsgl.cloneObject(this.controlPoint);
}