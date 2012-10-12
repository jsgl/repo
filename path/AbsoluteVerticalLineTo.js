
jsgl.path.AbsoluteVerticalLineTo = function(y) {

  jsgl.path.AbstractPathSegment.call(this);
  
  this.y = y || 0;
}
jsgl.path.AbsoluteVerticalLineTo.jsglExtend(
  jsgl.path.AbstractPathSegment);

/**
 * @description Gets the current absolute Y-axis coordinate of the line's target.
 * @methodOf jsgl.path.AbsoluteVerticalLineTo#
 * @returns {Number} The current target Y-axis coordinate
 * @since version 2.0
 */
jsgl.path.AbsoluteVerticalLineTo.prototype.getY = function() {

  return this.y;
}

/**
 * @description Sets the new absolute Y-axis coordinate for the line's target.
 * @methodOf jsgl.path.AbsoluteVerticalLineTo#
 * @param {Number} newY The new Y-axis coordinate for the line's target.
 * @since version 2.0
 */
jsgl.path.AbsoluteVerticalLineTo.prototype.setY = function(newY) {

  this.y = newY;
  this.onChangeRaiser.raiseEvent();
}

jsgl.path.AbsoluteVerticalLineTo.prototype.toSvgCommand = function() {

  return "V" + this.y;
}

jsgl.path.AbsoluteVerticalLineTo.prototype.toVmlCommand = function(pathHistory) {

  return "l" + (pathHistory.currLoc.X).jsglVmlize() + "," + (this.y).jsglVmlize();
}

jsgl.path.AbsoluteVerticalLineTo.prototype.getNewLocation = function(pathHistory) {

  return new jsgl.Vector2D(pathHistory.currLoc.X, this.y);
}