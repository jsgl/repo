jsgl.Vector2D = function(x,y) {

  this.X = typeof(x)=="number" ? x : 0;
  this.Y = typeof(y)=="number" ? y : 0;
}

jsgl.Vector2D.NULL = new jsgl.Vector2D();
jsgl.Vector2D.INVALID = new jsgl.Vector2D(Number.NaN, Number.NaN);

/**
 * @methodOf jsgl.Vector2D#
 * @description Gets the current X-axis coordinate of the vector.
 * @returns {Number}
 * @since version 1.0
 */    
jsgl.Vector2D.prototype.getX = function() {

  return this.X;
}

/**
 * @methodOf jsgl.Vector2D#
 * @description Sets the X-axis coordinate of the vector.
 * @param {Number} newX The new value for the X-axis coordinate.
 * @since version 1.0
 */  
jsgl.Vector2D.prototype.setX = function(newX) {

  this.X = typeof(newX) == "number" ? newX : 0;
}

/**
 * @methodOf jsgl.Vector2D#
 * @description Gets the current Y-axis coordinate of the vector.
 * @returns {Number}
 * @since version 1.0
 */    
jsgl.Vector2D.prototype.getY = function() {

  return this.Y;
}

/**
 * @methodOf jsgl.Vector2D#
 * @description Sets the Y-axis coordinate of the vector.
 * @param {Number} newY The new value for the Y-axis coordinate.
 * @since version 1.0
 */  
jsgl.Vector2D.prototype.setY = function(newY) {

  this.Y = typeof(newY) == "number" ? newY : 0;
}

/**
 * @methodOf jsgl.Vector2D#
 * @description Creates a new vector whose X and Y components are the
 * coordinates of the current vector, translated by a vector given as a parameter.
 * The current vector remains unchanged. 
 * @param {jsgl.Vector2D} v The translation vector.
 * @since version 1.0
 */ 
jsgl.Vector2D.prototype.add = function(v) {

  return new jsgl.Vector2D(this.X + v.X, this.Y + v.Y);
}

/**
 * @methodOf jsgl.Vector2D#
 * @descriptions Creates a new vector whose X and Y components are the
 * coordinates of the current vector, translated by a negation of the vector
 * given as a parameter. The current vector remains unchanged.
 * @param {jsgl.Vector2D} v The inverse-translation vector.
 * @since version 1.0
 */ 
jsgl.Vector2D.prototype.subtract = function(v) {

  return new jsgl.Vector2D(this.X - v.X, this.Y - v.Y);
}

/**
 * @methodOf jsgl.Vector2D#
 * @description Creates a new vector obtained by rotation of the current vector
 * around point [<code>centerX</code>,<code>centerY</code>] by <code>angle</code>
 * given in radians.
 * @param {Number} centerX The X-coordinate of the rotation origin.
 * @param {Number} centerY The Y-coordinate of the rotation origin.
 * @param {Number} angle The angle by which the current vector will be rotated,
 * given in radians.
 * @since version 1.0
 */           
jsgl.Vector2D.prototype.rotate = function(centerX, centerY, angle) {

  var alpha = angle + Math.atan2(this.Y - centerY, this.X - centerX),
      radius = Math.sqrt((this.X - centerX) * (this.X - centerX) +
                         (this.Y - centerY) * (this.Y - centerY));

  return new jsgl.Vector2D(centerX + Math.cos(alpha) * radius,
                           centerY + Math.sin(alpha) * radius);
}

/**
 * @methodOf jsgl.Vector2D# 
 * @since version 2.0
 */ 
jsgl.Vector2D.prototype.multiply = function(t) {

  return new jsgl.Vector2D(t*this.X, t*this.Y);
}

jsgl.Vector2D.prototype.round = function() {
  return new jsgl.Vector2D(Math.round(this.X), Math.round(this.Y));
}

jsgl.Vector2D.prototype.applyToCSSLocationOf=function(element)
{
  element.style.left=this.X+"px";
  element.style.top=this.Y+"px";
}

jsgl.Vector2D.prototype.applyToCSSSizeOf=function(element)
{
  element.style.width=this.X+"px";
  element.style.height=this.Y+"px";
}

/**
 * @methodOf jsgl.Vector2D#
 * @description Tests whether the vector is equal to the object given as the
 * argument.
 * @returns {Boolean} <code>false</code> if the argument is not instance of
 * <code>jsgl.Vector2D</code>, or if differs in X or Y component. <code>true<code>
 * if the argument is <code>jsgl.Vector2D</code> object, which is component-wise
 * equal to the current vector.
 * @since version 1.0
 */   
jsgl.Vector2D.prototype.equals = function(obj) {

  if(obj == null || typeof(obj) != "object") return false;
  if(obj.constructor != jsgl.Vector2D) return false;
  
  return (obj.X==this.X) && (obj.Y==this.Y);
}

/**
 * @methodOf jsgl.Vector2D#
 * @description Converts the vector to string representation.
 * @returns {String}
 * @since version 1.0
 */  
jsgl.Vector2D.prototype.toString = function() {
  return this.X+" "+this.Y;
}

/**
 * @methodOf jsgl.Vector2D
 * @description Calculated the Euclidean distance between the two vectors given
 * as arguments.
 * @returns {Number} Non-negative real number.
 * @since version 1.0
 */ 
jsgl.Vector2D.getDistance = function(vectA, vectB) {

  return Math.sqrt((vectA.X - vectB.X)*(vectA.X - vectB.X) + (vectA.Y - vectB.Y)*(vectA.Y - vectB.Y));
}