
jsgl.path.AbstractQuadraticBezier = function(controlX, controlY, endX, endY) {

  jsgl.path.AbstractPathSegment.call(this);
  
  this.controlPoint = new jsgl.Vector2D(controlX || 0, controlY || 0);
  
  this.endPoint = new jsgl.Vector2D(endX || 0, endY || 0);
}
jsgl.path.AbstractQuadraticBezier.jsglExtend(
  jsgl.path.AbstractPathSegment);

jsgl.path.AbstractQuadraticBezier.prototype.getControlX = function() {

  return this.controlPoint.X;
}

jsgl.path.AbstractQuadraticBezier.prototype.setControlX = function(newX) {

  this.controlPoint.X = newX;
  this.onChangeRaiser.raiseEvent();
}

jsgl.path.AbstractQuadraticBezier.prototype.getControlY = function() {

  return this.controlPoint.Y;
}

jsgl.path.AbstractQuadraticBezier.prototype.setControlY = function(newY) {

  this.controlPoint.Y = newY;
  this.onChangeRaiser.raiseEvent();
}

jsgl.path.AbstractQuadraticBezier.prototype.getControlPoint = function() {

  return jsgl.cloneObject(this.controlPoint);
}

jsgl.path.AbstractQuadraticBezier.prototype.setControlPoint = function(newLocation) {

  this.controlPoint = jsgl.cloneObject(newLocation);
  this.onChangeRaiser.raiseEvent();
}

jsgl.path.AbstractQuadraticBezier.prototype.getEndX = function() {

  return this.endPoint.X;
}

jsgl.path.AbstractQuadraticBezier.prototype.setEndX = function(newX) {

  this.endPoint.X = newX;
  this.onChangeRaiser.raiseEvent();
}

jsgl.path.AbstractQuadraticBezier.prototype.getEndY = function() {

  return this.endPoint.Y;
}

jsgl.path.AbstractQuadraticBezier.prototype.setEndY = function(newY) {

  this.endPoint.Y = newY;
  this.onChangeRaiser.raiseEvent();
}

jsgl.path.AbstractQuadraticBezier.prototype.getEndPoint = function() {

  return jsgl.cloneObject(this.endPoint);
}

jsgl.path.AbstractQuadraticBezier.prototype.setEndPoint = function(newLocation) {

  this.endPoint = jsgl.cloneObject(newLocation);
  this.onChangeRaiser.raiseEvent();
}

/**
 * @private
 */ 
jsgl.path.AbstractQuadraticBezier.prototype.isQuadraticBezier = function() {

  return true;
}