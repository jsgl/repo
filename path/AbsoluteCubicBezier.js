
jsgl.path.AbsoluteCubicBezier = function(c1x, c1y, c2x, c2y, endX, endY) {

  jsgl.path.AbstractCubicBezier.call(
    this, c1x || 0, c1y || 0, c2x || 0, c2y || 0, endX || 0, endY || 0);
}
jsgl.path.AbsoluteCubicBezier.jsglExtend(
  jsgl.path.AbstractCubicBezier);

jsgl.path.AbsoluteCubicBezier.prototype.toSvgCommand = function() {

  return "C" + this.control1.X + "," + this.control1.Y +
         "," + this.control2.X + "," + this.control2.Y +
         "," + this.endPoint.X + "," + this.endPoint.Y;
}

jsgl.path.AbsoluteCubicBezier.prototype.toVmlCommand = function(pathHistory) {

  return "c" + (this.control1.X).jsglVmlize() + "," + (this.control1.Y).jsglVmlize() +
         "," + (this.control2.X).jsglVmlize() + "," + (this.control2.Y).jsglVmlize() +
         "," + (this.endPoint.X).jsglVmlize() + "," + (this.endPoint.Y).jsglVmlize();
}

jsgl.path.AbsoluteCubicBezier.prototype.getNewLocation = function(pathHistory) {

  return jsgl.cloneObject(this.endPoint);
}

/**
 * @private
 */
jsgl.path.AbsoluteCubicBezier.prototype.getCBControlPoint = function(pathHistory) {

  return jsgl.cloneObject(this.control2);
}