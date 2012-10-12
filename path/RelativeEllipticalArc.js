
jsgl.path.RelativeEllipticalArc = function(rx, ry, rotation, largeArc, sweep, endX, endY) {

  jsgl.path.AbstractEllipticalArc.call(
    this, rx || 0, ry || 0, rotation || 0, !!largeArc, !!sweep, endX || 0, endY || 0);
}
jsgl.path.RelativeEllipticalArc.jsglExtend(
  jsgl.path.AbstractEllipticalArc);

jsgl.path.RelativeEllipticalArc.prototype.toSvgCommand = function() {

  return "a" + this.radii.X + "," + this.radii.Y + "," + this.rotation +
         "," + (this.largeArc ? "1" : "0") + "," +  (this.sweep ? "1" : "0") +
         "," + this.endPoint.X + "," + this.endPoint.Y;
}

jsgl.path.RelativeEllipticalArc.prototype.toVmlCommand = function(pathHistory) {

  return this.bezierApproximation(
    pathHistory.currLoc.X, pathHistory.currLoc.Y, this.rotation,
    this.radii.X, this.radii.Y, pathHistory.currLoc.X + this.endPoint.X,
    pathHistory.currLoc.Y + this.endPoint.Y, 16);
}

jsgl.path.RelativeEllipticalArc.prototype.getNewLocation = function(pathHistory) {

  return pathHistory.currLoc.add(this.endPoint);
}