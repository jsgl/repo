/**
 * @fileOverview Declaration and implementation of
 * <code>jsgl.elements.AbstractImageDomPresenter</code>.
 * @author Tomas Rehorek
 * @since version 2.0
 */    

/**
 * @class Base class for DOM presenters of JSGL image element. It contains
 * common methods for preloading images. In order for the image to be rendered
 * properly, its proportions must be known. Hence the image cannot be rendered
 * until it's preloaded. That is why this base class is important for both
 * SVG and VML image presenters.
 * @extends jsgl.elements.AbstractDomPresenter
 * @constructor
 * @description Base constructor for DOM presenters of JSGL image element.
 * @since version 2.0
 */         
jsgl.elements.AbstractImageDomPresenter = function() {

  /**
   * The URL of the image to be loaded.
   * @type string
   * @private
   */           
  this.loadedUrl = null;
  
  /**
   * Flag determining whether the image is already loaded. This property may
   * be considered protected and can be read by inheriting classes.   
   * @type boolean
   * @private
   */           
  this.isLoaded = false;
  
  /**
   * The browser's Image object for preloading.
   * @type Image
   * @private
   */           
  this.image = null;
}
jsgl.elements.AbstractImageDomPresenter.jsglExtend(
  jsgl.elements.AbstractDomPresenter);

/**
 * @description Informs the presenter about the current URL of the image that
 * needs to be loaded. If the presenter sees that the URL has changed from the
 * last time, it immediately starts to download the image.
 * @methodOf jsgl.elements.AbstractImageDomPresenter#
 * @param {string} url The URL of the image that currently needs to be loaded.
 * @since version 2.0
 */   
jsgl.elements.AbstractImageDomPresenter.prototype.loadUrl = function(url) {

  if(this.loadedUrl != url) {

     this.loadedUrl = url;
     this.imageLoaded = false;
     this.image = new Image();
     this.image.src = url;
     
     this.image.onload = jsgl.util.delegate(this, function() {

         this.isLoaded = true;
       });

  }
}

/**
 * @description Gets the dimension of the image currently preloaded. If the
 * preloading has not finished yet, zero vector is returned.
 * @methodOf jsgl.elements.AbstractImageDomPresenter#
 * @returns {jsgl.Vector2D}
 * @since version 2.0
 */     
jsgl.elements.AbstractImageDomPresenter.prototype.getImageSize = function() {

  if(this.isLoaded) {
  
    return new jsgl.Vector2D(this.image.width, this.image.height);
  }
  
  return new jsgl.Vector2D();
}