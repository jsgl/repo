
jsgl.path.RelativeLineTo = function(x, y) {

  jsgl.path.AbstractLineTo.call(this, x || 0, y || 0);
}
jsgl.path.RelativeLineTo.jsglExtend(
  jsgl.path.AbstractLineTo);

jsgl.path.RelativeLineTo.prototype.toSvgCommand = function() {

  return "l" + this.location.X + "," + this.location.Y;
}

jsgl.path.RelativeLineTo.prototype.toVmlCommand = function(pathHistory) {

  return "r" + (this.location.X).jsglVmlize() + "," + (this.location.Y).jsglVmlize();
}

jsgl.path.RelativeLineTo.prototype.getNewLocation = function(pathHistory) {

  return pathHistory.currLoc.add(this.location);
}