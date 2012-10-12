
jsgl.path.AbsoluteLineTo = function(x, y) {

  jsgl.path.AbstractLineTo.call(this, x || 0, y || 0);
}
jsgl.path.AbsoluteLineTo.jsglExtend(
  jsgl.path.AbstractLineTo);

jsgl.path.AbsoluteLineTo.prototype.toSvgCommand = function() {

  return "L" + this.location.X + "," + this.location.Y;
}

jsgl.path.AbsoluteLineTo.prototype.toVmlCommand = function(pathHistory) {

  return "l" + (this.location.X).jsglVmlize() + "," + (this.location.Y).jsglVmlize();
}

jsgl.path.AbsoluteLineTo.prototype.getNewLocation = function(pathHistory) {

  return jsgl.cloneObject(this.location);
}