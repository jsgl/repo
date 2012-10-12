
jsgl.path.AbstractSmoothCubicBezier = function(controlX, controlY, endX, endY) {

  jsgl.path.AbstractPathSegment.call(this);
  
  this.controlPoint = new jsgl.Vector2D(controlX || 0, controlY || 0);
  
  this.endPoint = new jsgl.Vector2D(endX || 0, endY || 0);
}
jsgl.path.AbstractSmoothCubicBezier.jsglExtend(
  jsgl.path.AbstractPathSegment);

jsgl.path.AbstractSmoothCubicBezier.prototype.getControlX = function() {

  return this.controlPoint.X;
}

jsgl.path.AbstractSmoothCubicBezier.prototype.setControlX = function(newX) {

  this.controlPoint.X = newX;
  this.onChangeRaiser.raiseEvent();
}

jsgl.path.AbstractSmoothCubicBezier.prototype.getControlY = function() {

  return this.controlPoint.Y;
}

jsgl.path.AbstractSmoothCubicBezier.prototype.setControlY = function(newY) {

  this.controlPoint.Y = newY;
  this.onChangeRaiser.raiseEvent();
}

jsgl.path.AbstractSmoothCubicBezier.prototype.getControlPoint = function() {

  return this.controlPoint;
}

jsgl.path.AbstractSmoothCubicBezier.prototype.setControlPoint = function(newLocation) {

  this.controlPoint = jsgl.cloneObject(newLocation);
  this.onChangeRaiser.raiseEvent();
}

jsgl.path.AbstractSmoothCubicBezier.prototype.getEndX = function() {

  return this.endPoint.X;
}

jsgl.path.AbstractSmoothCubicBezier.prototype.setEndX = function(newX) {

  this.endPoint.X = newX;
  this.onChangeRaiser.raiseEvent();
}

jsgl.path.AbstractSmoothCubicBezier.prototype.getEndY = function() {

  return this.endPoint.Y;
}

jsgl.path.AbstractSmoothCubicBezier.prototype.setEndY = function(newY) {

  this.endPoint.Y = newY;
  this.onChangeRaiser.raiseEvent();
}

jsgl.path.AbstractSmoothCubicBezier.prototype.getEndPoint = function() {

  return this.endPoint;
}

jsgl.path.AbstractSmoothCubicBezier.prototype.setEndPoint = function(newLocation) {

  this.endPoint = jsgl.cloneObject(newLocation);
  this.onChangeRaiser.raiseEvent();
}

/**
 * @private
 */ 
jsgl.path.AbstractSmoothCubicBezier.prototype.isCubicBezier = function() {

  return true;
}