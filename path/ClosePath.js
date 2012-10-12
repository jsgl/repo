
jsgl.path.ClosePath = function() {

  jsgl.path.AbstractPathSegment.call(this);
}
jsgl.path.ClosePath.jsglExtend(
  jsgl.path.AbstractPathSegment);

jsgl.path.ClosePath.prototype.toSvgCommand = function() {

  return "Z";
}

jsgl.path.ClosePath.prototype.toVmlCommand = function(pathHistory) {

  return "xm" + (pathHistory.lastStart.X).jsglVmlize() + "," + (pathHistory.lastStart.Y).jsglVmlize();
}

jsgl.path.ClosePath.prototype.getNewLocation = function(pathHistory) {

  return jsgl.cloneObject(pathHistory.currLoc);
}

jsgl.path.ClosePath.prototype.closesSubpath = function() {

  return true;
}