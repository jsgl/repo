
jsgl.path.RelativeHorizontalLineTo = function(x) {

  jsgl.path.AbstractPathSegment.call(this);
  
  this.x = x || 0;
}
jsgl.path.RelativeHorizontalLineTo.jsglExtend(
  jsgl.path.AbstractPathSegment);

/**
 * @description Gets the current relative X-axis coordinate of the line's target.
 * @methodOf jsgl.path.RelativeHorizontalLineTo#
 * @returns {Number} The current target X-axis coordinate.
 * @since version 2.0
 */
jsgl.path.RelativeHorizontalLineTo.prototype.getX = function() {

  return this.x;
}

/**
 * @description Sets the new relative X-axis coordinate for the line's target.
 * @methodOf jsgl.path.RelativeHorizontalLineTo#
 * @param {Number} newX The new X-axis coordinate for the line's target.
 * @since version 2.0
 */
jsgl.path.RelativeHorizontalLineTo.prototype.setX = function(newX) {

  this.x = newX;
  this.onChangeRaiser.raiseEvent();
}

jsgl.path.RelativeHorizontalLineTo.prototype.toSvgCommand = function() {

  return "h" + this.x;
}

jsgl.path.RelativeHorizontalLineTo.prototype.toVmlCommand = function(pathHistory) {

  return "r" + (this.x).jsglVmlize() + ",0";
}

jsgl.path.RelativeHorizontalLineTo.prototype.getNewLocation = function(pathHistory) {

  return new jsgl.Vector2D(pathHistory.currLoc.X + this.x, pathHistory.currLoc.Y);
}