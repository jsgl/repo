
jsgl.path.AbsoluteHorizontalLineTo = function(x) {

  jsgl.path.AbstractPathSegment.call(this);
  
  this.x = x || 0;
}
jsgl.path.AbsoluteHorizontalLineTo.jsglExtend(
  jsgl.path.AbstractPathSegment);

/**
 * @description Gets the current absolute X-axis coordinate of the line's target.
 * @methodOf jsgl.path.AbsoluteHorizontalLineTo#
 * @returns {Number} The current target X-axis coordinate
 * @since version 2.0
 */
jsgl.path.AbsoluteHorizontalLineTo.prototype.getX = function() {

  return this.x;
}

/**
 * @description Sets the new absolute X-axis coordinate for the line's target.
 * @methodOf jsgl.path.AbsoluteHorizontalLineTo#
 * @param {Number} newX The new X-axis coordinate for the line's target.
 * @since version 2.0
 */
jsgl.path.AbsoluteHorizontalLineTo.prototype.setX = function(newX) {

  this.x = newX;
  this.onChangeRaiser.raiseEvent();
}

jsgl.path.AbsoluteHorizontalLineTo.prototype.toSvgCommand = function() {

  return "H" + this.x;
}

jsgl.path.AbsoluteHorizontalLineTo.prototype.toVmlCommand = function(pathHisotry) {

  return "l" + (this.x).jsglVmlize() + "," + (pathHistory.currLoc.Y).jsglVmlize();
}

jsgl.path.AbsoluteHorizontalLineTo.prototype.getNewLocation = function(pathHistory) {

  return new jsgl.Vector2D(this.x, pathHistory.currLoc.Y);
}