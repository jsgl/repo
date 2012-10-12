
jsgl.path.RelativeMoveTo = function(x, y) {

  jsgl.path.AbstractMoveTo.call(this, x || 0, y || 0);
}
jsgl.path.RelativeMoveTo.jsglExtend(
  jsgl.path.AbstractMoveTo);

jsgl.path.RelativeMoveTo.prototype.toSvgCommand = function() {

  return "m" + this.location.X + "," + this.location.Y;
}

jsgl.path.RelativeMoveTo.prototype.toVmlCommand = function(pathHistory) {

  return "t" + (this.location.X).jsglVmlize() + "," + (this.location.Y).jsglVmlize();
}

jsgl.path.RelativeMoveTo.prototype.getNewLocation = function(pathHistory) {

  return pathHistory.currLoc.add(this.location);
}
