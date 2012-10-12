/**
 * @fileOverview Declaration and implementation of
 * <code>jsgl.elements.AbstractPolygonalElement</code>.
 * @author Tomas Rehorek
 * @since version 1.0   
 */

/**
 * @class Base class for polygonal JSGL elements (polygon, polyline).
 * @extends jsgl.elements.AbstractElement
 * @constructor
 * @description Base constructor for polygonal API elements.
 * @since version 1.0
 * @version 2.0
 */     
jsgl.elements.AbstractPolygonalElement=function(panel, zIndex) {

  jsgl.elements.AbstractElement.call(this, panel, zIndex);

  /**
   * The internal list of element's vertices.
   * @type jsgl.util.ArrayList
   * @private
   */             
  this.points=new jsgl.util.ArrayList();
}
jsgl.elements.AbstractPolygonalElement.jsglExtend(jsgl.elements.AbstractElement);

/**
 * @description Appends a point to the list of element's vertices. The point
 * is specified as <code>jsgl.Vector2D</code> object. 
 * @methodOf jsgl.elements.AbstractPolygonalElement#
 * @param {jsgl.Vector2D} The point to be appended.
 * @since version 1.0
 */   
jsgl.elements.AbstractPolygonalElement.prototype.addPoint=function(point) {

  this.addPointXY(point.X, point.Y);
}

/**
 * @description Appends a point to the list of element's vertices. The point
 * is specified as a couple of coordinates.
 * @methodOf jsgl.elements.AbstractPolygonalElement#
 * @param {number} A real number for the X-coordinate of the new vertex.
 * @param {number} A real number for the Y-coordinate of the new vertex.
 * @since version 1.0
 */  
jsgl.elements.AbstractPolygonalElement.prototype.addPointXY=function(x,y) {

  this.points.add(new jsgl.Vector2D(x,y));
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Clears the list of element's vertices. This serves as a reset
 * function if entirely new list of vertices is to be built.
 * @methodOf jsgl.elements.AbstractPolygonalElement#
 * @since version 1.0  
 */  
jsgl.elements.AbstractPolygonalElement.prototype.clearPoints=function() {

  this.points.clear();
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets a point from the list of element's vertices at specified
 * index.
 * @methodOf jsgl.elements.AbstractPolygonalElement#
 * @param {number} index Index of the point in the list.
 * @returns jsgl.Vector2D
 * @since version 1.0
 */      
jsgl.elements.AbstractPolygonalElement.prototype.getPointAt=function(index) {

  return jsgl.cloneObject(this.points.get(index));
}

/**
 * @description Updates the coordinates of a point in the list of element's vertices
 * at the specified index to new values. The coordinates are given as a couple
 * of real numbers. Note that the vertex must already be present in the list at
 * given position.
 * @methodOf jsgl.elements.AbstractPolygonalElement#
 * @param {number} x The new X-coordinate of the vertex to be updated.
 * @param {number} y The new Y-coordinate of the vertex to be updated.
 * @param {number} index Index of the point to be updated.
 * @since version 1.0
 */
jsgl.elements.AbstractPolygonalElement.prototype.setPointXYAt=function(x,y,index) {

  var point = this.points.get(index);
  point.X=x;
  point.Y=y;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Updates the coordiates of a point in the list of element's vertices
 * at the specified index to new values. The coordinates are specified as
 * <code>jsgl.Vector2D</code> object. Note that the vertex must already be
 * present in the list at given position.
 * @methodOf jsgl.elements.AbstractPolygonalElement#
 * @param {jsgl.Vector2D} point The new coordinates object.
 * @param {index} index Index of the point to be updated.
 * @since version 1.0
 */   
jsgl.elements.AbstractPolygonalElement.prototype.setPointAt=function(point,index) {

  this.setPointXYAt(point.X,point.Y,index);
}

/**
 * @description Gets the current number of the element's vertices.
 * @methodOf jsgl.elements.AbstractPolygonalElement#
 * @returns number
 * @since version 1.0
 */   
jsgl.elements.AbstractPolygonalElement.prototype.getPointsCount=function() {

  return this.points.getCount();
}

/**
 * @description Inserts a new point to the list of element's vertices at the
 * specified index. All the points starting at the index up to the end of the
 * list are shifted right. The new point is specified as a <code>jsgl.Vector2D</code>
 * object.
 * @methodOf jsgl.elements.AbstractPolygonalElement#
 * @param {jsgl.Vector2D} point The point to be inserted.
 * @since version 1.0
 */  
jsgl.elements.AbstractPolygonalElement.prototype.insertPointAt=function(point,index) {

  this.insertPointXYAt(point.X,point.Y,index);
}

/**
 * @description Inserts a new point to the list of element's vertices at the
 * specified index. All the points starting at the index up to the end of the
 * list are shifted right. The new point is specified as a couple of
 * real-valued coordinates.
 * @methodOf jsgl.elements.AbstractPolygonalElement#
 * @param {number} x The X-coordinate of the point to be inserted.
 * @param {number} y The Y-coordinate of the point to be inserted.
 * @since version 1.0
 */   
jsgl.elements.AbstractPolygonalElement.prototype.insertPointXYAt=function(x,y,index) {

  this.points.insertAt(new jsgl.Vector2D(x,y),index);
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Removes a point from the list of element's vertices at the
 * specified index. The rest of the list is shifted left after the point is
 * removed.
 * @methodOf jsgl.elements.AbstractPolygonalElement#
 * @param {number} index Index of the point to be removed.
 * @since version 1.0
 */
jsgl.elements.AbstractPolygonalElement.prototype.removePointAt=function(index) {

  this.points.removeAt(index);
  this.onChangeRaiser.raiseEvent();
}