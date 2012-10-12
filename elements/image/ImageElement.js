/**
 * @fileOverview Declaration and implementation of JSGL API
 * <code>jsgl.elements.ImageElement</code>.
 * @author Tomas Rehorek
 * @since version 2.0   
 */
 
/**
 * @class Image element API class.
 * @extends jsgl.elements.AbstractElement
 * @constructor
 * @description Creates new instance of <code>jsgl.elements.ImageElement</code>.
 * @param {jsgl.elements.AbstractImageDomPresenter} domPresenter Appropriate DOM
 * presenter for rendering the image on the user's browser.
 * @param {jsgl.Panel} panel The factory <code>jsgl.Panel</code> object that
 * is creating the image. Note that no other object than <code>jsgl.Panel</code>
 * should call this constructor.
 * @since version 2.0
 */    
jsgl.elements.ImageElement=function(domPresenter,panel) {

  jsgl.elements.AbstractElement.call(this,panel);
  
  /**
   * Location of the anchor point of the image
   * @type jsgl.Vector2D
   * @private
   */           
  this.location=new jsgl.Vector2D();
  
  /**
   * Size vector of the image. The X-coordinate of the vector represent width,
   * while the Y-coordinate represents height. Note that the image of this
   * proportions may be further rotated.
   * @type jsgl.Vector2D
   * @private
   */
  this.size=new jsgl.Vector2D();
  
  /**
   * Horizontal anchor of the image. It specifies the X-component of the anchor
   * to which image location is related and around which the image rotates.
   * @type jsgl.HorizontalAnchor
   * @private
   */
  this.horizontalAnchor = jsgl.HorizontalAnchor.LEFT;           
  
  /**
   * Vertical anchor of the image. It specifies Y-component of the anchor to
   * which image location is related and around which the image rotates.
   * @type jsgl.VerticalAnchor
   * @private
   */               
  this.verticalAnchor = jsgl.VerticalAnchor.TOP;
  
  /**
   * Determines whether the X-coordinate of the image is autosized.
   * @type boolean
   * @private
   */           
  this.autosizeX = true;
  
  /**
   * Determines whether the Y-coordinate of the image is autosized.
   * @type boolean
   * @private
   */
  this.autosizeY = true;           
  
  /**
   * Clockwise rotation in degrees of the image around its anchor point.
   * @type number
   * @private
   */      
  this.rotation = 0;
  
  /**
   * Opacity of the image. This is a real number from interval [0,1]. 0.0 means
   * fully transparent, 1.0 means fully opaque.
   * @type number
   * @private      
   */
  this.opacity = 1.0;
  
  /**
   * URL of the image.
   * @type string
   * @private
   */
  this.url = "";

  /**
   * Stroke object specifying style of optional outline of the image.
   * @type jsgl.elements.AbstractStroke
   * @private
   */
  this.stroke = null;
  this.setStroke(new jsgl.stroke.SolidStroke());
  this.stroke.setEnabled(false);

  /**
   * The function listening to changes in the associated stroke object.
   * @type function
   * @private
   */             
  this.strokeChangeListener = jsgl.util.delegate(
    this.onChangeRaiser, this.onChangeRaiser.raiseEvent);

  /**
   * The DOM presenter that is used for rendering the image.
   * @type jsgl.elements.AbstractImageDomPresenter
   * @private
   */
  this.domPresenter=domPresenter;
  this.domPresenter.setGraphicsElement(this);
}
jsgl.elements.ImageElement.jsglExtend(jsgl.elements.AbstractElement);

/**
 * @description Gets the associated DOM presenter that is used for rendering
 * the image.
 * @methodOf jsgl.elements.ImageElement#
 * @returns {jsgl.elements.AbstractImageDomPresenter}
 * @since version 2.0
 */     
jsgl.elements.ImageElement.prototype.getDomPresenter = function() {

  return this.domPresenter;
}

/**
 * @description Gets the current X-coordinate of the image's anchor point.
 * @methodOf jsgl.elements.ImageElement#
 * @returns {number}
 * @since version 2.0
 */    
jsgl.elements.ImageElement.prototype.getX = function() {

  return this.location.X;
}

/**
 * @description Sets the X-coordinate of the image's anchor point.
 * @methodOf jsgl.elements.ImageElement#
 * @param {number} newX Real number representing the new X-coordinate of
 * the image's anchor point.
 * @since version 2.0
 */
jsgl.elements.ImageElement.prototype.setX = function(newX) {

  this.location.X = newX;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current Y-coordinate of the image's anchor point.
 * @methodOf jsgl.elements.ImageElement#
 * @returns {number}
 * @since version 2.0
 */    
jsgl.elements.ImageElement.prototype.getY = function() {

  return this.location.Y;
}

/**
 * @description Sets the Y-coordinate of the image's anchor point.
 * @methodOf jsgl.elements.ImageElement#
 * @param {number} newY Real number representing the new Y-coordinate of
 * the image's anchor point.
 * @since version 2.0
 */   
jsgl.elements.ImageElement.prototype.setY = function(newY) {

  this.location.Y = newY;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current location of the image's anchor point.
 * @methodOf jsgl.elements.ImageElement#
 * @returns {jsgl.Vector2D}
 * @since version 2.0
 */    
jsgl.elements.ImageElement.prototype.getLocation = function() {

  return jsgl.cloneObject(this.location);
}

/**
 * @description Sets the coordinates of the image's anchor point using a
 * <code>jsgl.Vector2D</code> object.
 * @methodOf jsgl.elements.ImageElement#
 * @param {jsgl.Vector2D} newLocation The new coordinates of the anchor point.
 * @since version 2.0
 */     
jsgl.elements.ImageElement.prototype.setLocation = function(newLocation) {

  this.setlLcationXY(newLocation.X, newLocation.Y);
}

/**
 * @description Sets the location of the image's anchor point using couple
 * of real-valued coordinates. 
 * @methodOf jsgl.elements.ImageElement#
 * @param {number} newX Real number representing the new X-coordinate of the
 * anchor point.
 * @param {number} newY Real number representing the new Y-coordinate of the
 * anchor point.
 * @since version 2.0
 */   
jsgl.elements.ImageElement.prototype.setLocationXY = function(newX, newY) {

  this.location.X=newX;
  this.location.Y=newY;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current width of the image. If the width has previously
 * been set manually, then the manually set width is returned. If the width hasn't
 * been set manually, two cases may happen: 1) The image has already been loaded
 * and its physical width is returned; 2) The image has not been loaded yet and
 * zero is returned.
 * @methodOf jsgl.elements.ImageElement#
 * @returns {number}
 * @since version 2.0
 */         
jsgl.elements.ImageElement.prototype.getWidth = function() {

  return this.autosizeX ? this.domPresenter.getImageSize().X : this.size.X;
}

/**
 * @description Sets the width of the image. This overrides the physical width
 * of the image that is detected automatically after the image is loaded.
 * @methodOf jsgl.elements.ImageElement#
 * @param {number} newWidth Real number representing the new width of the image.
 * @since version 2.0
 */  
jsgl.elements.ImageElement.prototype.setWidth = function(newWidth) {

  this.autosizeX = false;
  this.size.X=newWidth;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current height of the image. If the height has previously
 * been set manually, then the manually set height is returned. If the height hasn't
 * been set manually, two cases may happen: 1) The image has already been loaded
 * and its physical height is returned; 2) The image has not been loaded yet and
 * zero is returned.
 * @methodOf jsgl.elements.ImageElement#
 * @returns {number}
 * @since version 2.0
 */       
jsgl.elements.ImageElement.prototype.getHeight = function() {

  return this.autosizeY ? this.domPresenter.getImageSize().Y : this.size.Y;
}

/**
 * @description Sets the height of the image. This overrides the physical height
 * of the image that is detected automatically after the image is loaded.
 * @methodOf jsgl.elements.ImageElement#
 * @param {number} newHeight Real number representing the new height of the image.
 * @since version 2.0
 */     
jsgl.elements.ImageElement.prototype.setHeight = function(newHeight) {

  this.autosizeY = false;
  this.size.Y=newHeight;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current size of the image as <code>jsgl.Vector2D</code>.
 * The X-coordinate of the vector represents the currently used width of the
 * image, whilst the Y-coordinate means the currently used height.  
 * @methodOf jsgl.elements.ImageElement#
 * @returns {jsgl.Vector2D}
 * @since version 2.0
 */   
jsgl.elements.ImageElement.prototype.getSize = function() {

  return new jsgl.Vector2D(
    this.autosizeX ? this.domPresenter.getImageSize().X : this.size.X,
    this.autosizeY ? this.domPresenter.getImageSize().Y : this.size.Y);
}

/**
 * @description Sets the size of the image using <code>jsgl.Vector2D</code>
 * object. This overrides the physical dimensions of the image that are detected
 * automatically after the image is loaded.
 * @methodOf jsgl.elements.ImageElement#
 * @param {jsgl.Vector2D} newSize The new size vector for the image.
 * @since version 2.0
 */ 
jsgl.elements.ImageElement.prototype.setSize = function(newSize) {

  this.setSizeWH(newSize.X,newSize.Y);
}

/**
 * @description Sets the size (Width and Height) of the image using couple of
 * real numbers. This overrides the physical dimensions of the image that are
 * detected automatically after the image is loaded.
 * @methodOf jsgl.elements.ImageElement#
 * @param {number} newW Real number representing the new width of the image.
 * @param {number} newH Real number representing the new height of the image.
 * @since version 2.0
 */      
jsgl.elements.ImageElement.prototype.setSizeWH = function(newW,newH) {

  this.autosizeX = false;
  this.autosizeY = false;
  
  this.size.X=newW;
  this.size.Y=newH;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current opacity of the image.
 * @methodOf jsgl.elements.ImageElement#
 * @returns {number}
 * @since version 2.0
 */    
jsgl.elements.ImageElement.prototype.getOpacity = function() {

  return this.opacity;
}

/**
 * @description Sets the new opacity of the image.
 * @methodOf jsgl.elements.ImageElement#
 * @param {number} opacity The new opacity. This is a real number from interval
 * [0,1]. 0.0 means fully transparent, 1.0 means fully opaque.
 * @since version 2.0
 */  
jsgl.elements.ImageElement.prototype.setOpacity = function(opacity) {

  this.opacity = opacity;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current clockwise rotation of the image around its
 * anchor point in degrees.
 * @methodOf jsgl.elements.ImageElement#
 * @returns {number}
 * @since version 2.0
 */     
jsgl.elements.ImageElement.prototype.getRotation = function() {

  return this.rotation;
}

/**
 * @description Sets the clockwise rotation of the image around its anchor
 * point in degrees.
 * @methodOf jsgl.elements.ImageElement#
 * @param {number} rotation Real number representing the new rotation in degrees.
 * @since version 2.0
 */     
jsgl.elements.ImageElement.prototype.setRotation = function(rotation) {

  this.rotation = rotation;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current horizontal anchor of the image.
 * @methodOf jsgl.elements.ImageElement#
 * @returns {jsgl.HorizontalAnchor}
 * @since version 2.0
 */    
jsgl.elements.ImageElement.prototype.getHorizontalAnchor = function() {

  return this.horizontalAnchor;
}

/**
 * @description Sets the horizontal anchor of the image. This influences how
 * the image is horizontally positioned with respect to its anchor point. This
 * also affects how the image is rotated around the anchor point.
 * @methodOf jsgl.elements.ImageElement#
 * @param {jsgl.HorizontalAnchor} horAnchor The new horizontal anchor for the image.
 * @since version 2.0
 */  
jsgl.elements.ImageElement.prototype.setHorizontalAnchor = function(horAnchor) {

  this.horizontalAnchor = horAnchor;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current vertical anchor of the image.
 * @methodOf jsgl.elements.ImageElement#
 * @returns {jsgl.VerticalAnchor}
 * @since version 2.0
 */     
jsgl.elements.ImageElement.prototype.getVerticalAnchor = function() {

  return this.verticalAnchor;
}

/**
 * @description Sets the vertical anchor of the image. This influences how
 * the image is vertically positioned with respect to its anchor point. This
 * also affects how the image is rotated around the anchor point.
 * @methodOf jsgl.elements.ImageElement# 
 * @param {jsgl.VerticalAnchor} vertAnchor The new vertical anchor for the image.
 * @since version 2.0
 */ 
jsgl.elements.ImageElement.prototype.setVerticalAnchor = function(vertAnchor) {

  this.verticalAnchor = vertAnchor;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current URL of the image.
 * @methodOf jsgl.elements.ImageElement#
 * @returns {string}
 * @since version 2.0
 */    
jsgl.elements.ImageElement.prototype.getUrl=function() {
  
  return this.url;
}

/**
 * @description Sets the new URL of the image to be loaded.
 * @methodOf jsgl.elements.ImageElement#
 * @param {string} url The new URL of the image.
 * @since version 2.0
 */     
jsgl.elements.ImageElement.prototype.setUrl = function(url) {

  this.url = url;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the stroke object that is currently used for painting an
 * outline of the image. By default, the stroke is disabled, i.e. there is no
 * outline painted. To enable outline painting, use
 * <code>myImage.getStroke().setEnabled(true)</code>.
 * @methodOf jsgl.elements.ImageElement#
 * @returns {jsgl.stroke.AbstractStroke} The stroke object currently used by the
 * image.
 * @since version 2.0
 */
jsgl.elements.ImageElement.prototype.getStroke = function() {

  return this.stroke;
}

/**
 * @description Sets the new stroke object to be used for painting outline of the
 * image. The image element will be listening to changes in the stroke object
 * and will repaint itself automatically whenever the stroke stroke changes. 
 * @methodOf jsgl.elements.ImageElement#
 * @param {jsgl.stroke.AbstractStroke} newStroke The new stroke object to be
 * used for painting outline of the image.
 * @since version 2.0
 */
jsgl.elements.ImageElement.prototype.setStroke = function(newStroke) {

  this.stroke = newStroke;
  this.onChangeRaiser.raiseEvent();
}  