
jsgl.path.AbsoluteMoveTo = function(x, y) {

  jsgl.path.AbstractMoveTo.call(this, x || 0, y || 0);
}
jsgl.path.AbsoluteMoveTo.jsglExtend(
  jsgl.path.AbstractMoveTo);

jsgl.path.AbsoluteMoveTo.prototype.toSvgCommand = function() {

  return "M" + this.location.X + "," + this.location.Y;
}

jsgl.path.AbsoluteMoveTo.prototype.toVmlCommand = function(pathHistory) {

  return "m" + (this.location.X).jsglVmlize() + "," + (this.location.Y).jsglVmlize();
}

jsgl.path.AbsoluteMoveTo.prototype.getNewLocation = function(pathHistory) {

  return jsgl.cloneObject(this.location);
}