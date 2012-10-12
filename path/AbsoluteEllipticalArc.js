
jsgl.path.AbsoluteEllipticalArc = function(rx, ry, rotation, largeArc, sweep, endX, endY) {

  jsgl.path.AbstractEllipticalArc.call(
    this, rx || 0, ry || 0, rotation || 0, !!largeArc, !!sweep, endX || 0, endY || 0);
}
jsgl.path.AbsoluteEllipticalArc.jsglExtend(
  jsgl.path.AbstractEllipticalArc);

jsgl.path.AbsoluteEllipticalArc.prototype.toSvgCommand = function() {

  return "A" + this.radii.X + "," + this.radii.Y + "," + this.rotation +
         "," + (this.largeArc ? "1" : "0") + "," +  (this.sweep ? "1" : "0") +
         "," + this.endPoint.X + "," + this.endPoint.Y;
}

jsgl.path.AbsoluteEllipticalArc.prototype.toVmlCommand = function(pathHistory) {

  return this.bezierApproximation(
    pathHistory.currLoc.X, pathHistory.currLoc.Y, this.rotation,
    this.radii.X, this.radii.Y, this.endPoint.X, this.endPoint.Y, 16);

}

jsgl.path.AbsoluteEllipticalArc.prototype.getNewLocation = function(pathHistory) {

  return jsgl.cloneObject(this.endPoint);
}