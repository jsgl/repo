
jsgl.path.RelativeCubicBezier = function(c1x, c1y, c2x, c2y, endX, endY) {

  jsgl.path.AbstractCubicBezier.call(
    this, c1x || 0, c1y || 0, c2x || 0, c2y || 0, endX || 0, endY || 0);
}
jsgl.path.RelativeCubicBezier.jsglExtend(
  jsgl.path.AbstractCubicBezier);

jsgl.path.RelativeCubicBezier.prototype.toSvgCommand = function() {

  return "c" + this.control1.X + "," + this.control1.Y +
         "," + this.control2.X + "," + this.control2.Y +
         "," + this.endPoint.X + "," + this.endPoint.Y;
}

jsgl.path.RelativeCubicBezier.prototype.toVmlCommand = function(pathHistory) {

  return "v" + (this.control1.X).jsglVmlize() + "," + (this.control1.Y).jsglVmlize() +
         "," + (this.control2.X).jsglVmlize() + "," + (this.control2.Y).jsglVmlize() +
         "," + (this.endPoint.X).jsglVmlize() + "," + (this.endPoint.Y).jsglVmlize();
}

jsgl.path.RelativeCubicBezier.prototype.getNewLocation = function(pathHistory) {

  return pathHistory.currLoc.add(this.endPoint);
}

/**
 * @private
 */
jsgl.path.RelativeCubicBezier.prototype.getCBControlPoint = function(pathHistory)  {

  return pathHistory.currLoc.add(this.control2);
}