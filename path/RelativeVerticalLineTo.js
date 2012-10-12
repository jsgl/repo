
jsgl.path.RelativeVerticalLineTo = function(y) {

  jsgl.path.AbstractPathSegment.call(this);
  
  this.y = y || 0;
}
jsgl.path.RelativeVerticalLineTo.jsglExtend(
  jsgl.path.AbstractPathSegment);

/**
 * @description Gets the current relative Y-axis coordinate of the line's target.
 * @methodOf jsgl.path.RelativeVerticalLineTo#
 * @returns {Number} The current target Y-axis coordinate.
 * @since version 2.0
 */
jsgl.path.RelativeVerticalLineTo.prototype.getY = function() {

  return this.y;
}

/**
 * @description Sets the new relative Y-axis coordinate for the line's target.
 * @methodOf jsgl.path.RelativeVerticalLineTo#
 * @param {Number} newX The new Y-axis coordinate for the line's target.
 * @since version 2.0
 */
jsgl.path.RelativeVerticalLineTo.prototype.setY = function(newY) {

  this.y = newY;
  this.onChangeRaiser.raiseEvent();
}

jsgl.path.RelativeVerticalLineTo.prototype.toSvgCommand = function() {

  return "v" + this.y;
}

jsgl.path.RelativeVerticalLineTo.prototype.toVmlCommand = function(pathHistory) {

  return "r0," + (this.y).jsglVmlize();
}

jsgl.path.RelativeVerticalLineTo.prototype.getNewLocation = function(pathHistory) {

  return new jsgl.Vector2D(pathHistory.currLoc.X, pathHistory.currLoc.Y + this.y);
}