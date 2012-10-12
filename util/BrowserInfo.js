/**
 * @fileOverview Detect information about user's web browser.
 * @author Tomas Rehorek
 * @since version 1.0
 */  

/**
 * Table of properties capturing information about user's web browser.
 * @class 
 * @constant 
 * @memberOf jsgl.util
 */  
jsgl.util.BrowserInfo=(function() {
  __browserinfo=0;

  document.write("<!--[if vml]><script type='text/javascript'>__browserinfo++;</script><![endif]-->");

  if(document.implementation&&(document.implementation.hasFeature("org.w3c.svg", "1.0") ||
 	            document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#SVG", "1.1") ||
 	            document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"))) __browserinfo+=2;

  document.write("<!--[if IE]><script type='text/javascript'>__browserinfo+=4;</script><![endif]-->");
  document.write("<!--[if IE 5.5000]><script type='text/javascript'>__browserinfo+=8;</script><![endif]-->");
  document.write("<!--[if lte IE 6]><script type='text/javascript'>__browserinfo+=32;</script><![endif]-->");
  document.write("<!--[if lte IE 7]><script type='text/javascript'>__browserinfo+=64;</script><![endif]-->");

  if(typeof(window.event)!="undefined") __browserinfo+=16;

  /**
   * Determines whether the browser support Vector Markup Language (VML).
   * @type boolean   
   */      
  this.supportsVml=!!(__browserinfo & 1);

  /**
   * Determines whether the browser support Scalable Vector Graphics (SVG).
   * @type boolean
   */
  this.supportsSvg=!!(__browserinfo & 2);
  
  /**
   * Determines whether the browser is MSIE.
   * @type boolean   
   */     
  this.isMSIE=!!(__browserinfo & 4);
  
  /**
   * Determines whether the browser is MSIE 5.5.
   * @type boolean   
   */   
  this.isMSIE55=!!(__browserinfo & 8);

  /**
   * Determines whether the browser supports window.event
   * @type boolean   
   */     
  this.usesWindowEvent=!!(__browserinfo & 16);
  
  /**
   * Determines whether the browser is MSIE <= 6.
   * @type boolean
   */
  this.isMSIElte6 = !!(__browserinfo & 32);
  
  /**
   * Determines whether the browser is MSIE <= 7.
   * @type boolean
   */
  this.isMSIElte7 = !!(__browserinfo && 64);        
  
  /**
   * Determines whether the browser is Opera-like.
   * @type boolean
   */
  this.isOpera = !this.isMSIE && this.usesWindowEvent;
  
  return this;
})();