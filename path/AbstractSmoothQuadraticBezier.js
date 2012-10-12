
jsgl.path.AbstractSmoothQuadraticBezier = function(x, y) {

  jsgl.path.AbstractPathSegment.call(this);
  
  this.endPoint = new jsgl.Vector2D(x || 0, y || 0);
}
jsgl.path.AbstractSmoothQuadraticBezier.jsglExtend(
  jsgl.path.AbstractPathSegment);

jsgl.path.AbstractSmoothQuadraticBezier.prototype.getEndX = function() {

  return this.endPoint.X;
}

jsgl.path.AbstractSmoothQuadraticBezier.prototype.setEndX = function(newX) {

  this.endPoint.X = newX;
  this.onChangeRaiser.raiseEvent();
}

jsgl.path.AbstractSmoothQuadraticBezier.prototype.getEndY = function() {

  return this.endPoint.Y;
}

jsgl.path.AbstractSmoothQuadraticBezier.prototype.setEndY = function(newY) {

  this.endPoint.Y = newY;
  this.onChangeRaiser.raiseEvent();
}

jsgl.path.AbstractSmoothQuadraticBezier.prototype.getEndPoint = function() {

  return jsgl.cloneObject(this.endPoint);
}

jsgl.path.AbstractSmoothQuadraticBezier.prototype.setEndPoint = function(newLocation) {

  this.endPoint = jsgl.cloneObject(newLocation);
  this.onChangeRaiser.raiseEvent(newLocation);
}

jsgl.path.AbstractSmoothQuadraticBezier.prototype.isQuadraticBezier = function() {

  return true;
}