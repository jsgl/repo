
jsgl.path.AbstractCubicBezier = function(c1x, c1y, c2x, c2y, endX, endY) {

  jsgl.path.AbstractPathSegment.call(this);

  this.control1 = new jsgl.Vector2D(c1x || 0, c1y || 0);

  this.control2 = new jsgl.Vector2D(c2x || 0, c2y || 0);
  
  this.endPoint = new jsgl.Vector2D(endX || 0, endY || 0);
}
jsgl.path.AbstractCubicBezier.jsglExtend(
  jsgl.path.AbstractPathSegment);

jsgl.path.AbstractCubicBezier.prototype.getControl1X = function() {

  return this.control1.X;
}

jsgl.path.AbstractCubicBezier.prototype.setControl1X = function(newX) {

  this.control1.X = newX;
  this.onChangeRaiser.raiseEvent();
}

jsgl.path.AbstractCubicBezier.prototype.getControl1Y = function() {

  return this.control1.Y;
}

jsgl.path.AbstractCubicBezier.prototype.setControl1Y = function(newY) {

  this.control1.Y = newY;
  this.onChangeRaiser.raiseEvent();
}

jsgl.path.AbstractCubicBezier.prototype.getControl1Point = function() {

  return jsgl.cloneObject(this.control1);
}

jsgl.path.AbstractCubicBezier.prototype.setControl1Point = function(newLocation) {

  this.control1 = jsgl.cloneObject(newLocation);
  this.onChangeRaiser.raiseEvent();
}

jsgl.path.AbstractCubicBezier.prototype.getControl2X = function() {

  return this.control2.X;
}

jsgl.path.AbstractCubicBezier.prototype.setControl2X = function(newX) {

  this.control2.X = newX;
  this.onChangeRaiser.raiseEvent();
}

jsgl.path.AbstractCubicBezier.prototype.getControl2Y = function() {

  return this.control2.Y;
}

jsgl.path.AbstractCubicBezier.prototype.setControl2Y = function(newY) {

  this.control2.Y = newY;
  this.onChangeRaiser.raiseEvent();
}

jsgl.path.AbstractCubicBezier.prototype.getControl2Point = function() {

  return jsgl.cloneObject(this.control2);
}

jsgl.path.AbstractCubicBezier.prototype.setControl2Point = function(newLocation) {

  this.control2 = jsgl.cloneObject(newLocation);
  this.onChangeRaiser.raiseEvent();
}

jsgl.path.AbstractCubicBezier.prototype.getEndX = function() {

  return this.endPoint.X;
}

jsgl.path.AbstractCubicBezier.prototype.setEndX = function(newX) {

  this.endPoint.X = newX;
  this.onChangeRaiser.raiseEvent();
}

jsgl.path.AbstractCubicBezier.prototype.getEndY = function() {

  return this.endPoint.Y;
}

jsgl.path.AbstractCubicBezier.prototype.setEndY = function(newY) {

  this.endPoint.Y = newY;
  this.onChangeRaiser.raiseEvent();
}

jsgl.path.AbstractCubicBezier.prototype.getEndPoint = function() {

  return jsgl.cloneObject(this.endPoint);
}

jsgl.path.AbstractCubicBezier.prototype.setEndPoint = function(newLocation) {

  this.endPoint = jsgl.cloneObject(newLocation);
  this.onChangeRaiser.raiseEvent();
}

/**
 * @private
 */
jsgl.path.AbstractCubicBezier.prototype.isCubicBezier = function() {

  return true;
} 