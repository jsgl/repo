
jsgl.path.AbstractLineTo = function(x, y) {

  jsgl.path.AbstractPathSegment.call(this);
  
  this.location = new jsgl.Vector2D(x || 0, y || 0);
}
jsgl.path.AbstractLineTo.jsglExtend(
  jsgl.path.AbstractPathSegment);

/**
 * @description Gets the current X-axis coordinate of the target point.
 * @methodOf jsgl.path.AbstractLineTo#
 * @returns {Number} The current X-coordinate of the target point.
 * @since version 2.0
 */
jsgl.path.AbstractLineTo.prototype.getX = function() {

  return this.location.X;
}

/**
 * @description Sets the new X-axis coordinate of the target point.
 * @methodOf jsgl.path.AbstractLineTo#
 * @param {Number} newX The new X-coordinate of the target point.
 * @since version 2.0
 */
jsgl.path.AbstractLineTo.prototype.setX = function(newX) {

  this.location.X = newX;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current Y-axis coordinate of the target point.
 * @methodOf jsgl.path.AbstractLineTo#
 * @returns {Number} The current Y-coordinate of the target point.
 * @since version 2.0
 */
jsgl.path.AbstractLineTo.prototype.getY = function() {

  return this.location.Y;
}

/**
 * @description Sets the new Y-axis coordinate of the target point.
 * @methodOf jsgl.path.AbstractLineTo#
 * @param {Number} newY The new Y-coordinate of the target point.
 * @since version 2.0
 */
jsgl.path.AbstractLineTo.prototype.setY = function(newY) {

  this.location.Y = newY;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current coordinates of the target point.
 * @methodOf jsgl.path.AbstractMoveTo#
 * @returns {jsgl.Vector2D} The current target point.
 * @since version 2.0
 */
jsgl.path.AbstractLineTo.prototype.getEndPoint = function() {

  return jsgl.cloneObject(this.location);
}

/**
 * @description Sets the new target point using a <code>jsgl.Vector2D</code>
 * object.
 * @methodOf jsgl.path.AbstractMoveTo#
 * @param {jsgl.Vector2D} newLocation The new target point.
 * @since version 2.0
 */
jsgl.path.AbstractLineTo.prototype.setEndPoint = function(location) {

  this.location = jsgl.cloneObject(location);
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Sets the new target point using a couple of real-valued
 * coordinates (x,y).
 * @param {Number} newX The new X-coordinate of the target point.
 * @param {Number} newY The new Y-coordinate of the target point.
 * @methodOf jsgl.path.AbstractMoveTo#
 * @since version 2.0   
 */
jsgl.path.AbstractLineTo.prototype.setEndPointXY = function(newX, newY) {

  this.location.X = newX;
  this.location.Y = newY;
  this.onChangeRaiser.raiseEvent();
}