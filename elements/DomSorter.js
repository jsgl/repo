/**
 * @fileOverview <code>jsgl.elements.DomSorter</code> class implementation.
 * @author Tomas Rehorek
 * @since version 2.0
 */

/**
 * @class Maintains ordering of elements within given DOM node according to their
 * z-indices and age. This allows to emulate CSS z-index which is not included
 * into SVG standard and is also not supported by the browser. Hence the only
 * way how to implement z-index is to maintain ordering of SVG nodes.
 * @constructor
 * @description Creates new DOM sorter for given parent DOM node.
 * @param {Element} domRoot The DOM element that will serve as a container for
 * JSGL elements' DOM presenters' XML elements.
 * @since version 2.0
 */  
jsgl.elements.DomSorter = function(domRoot) {

  this.domRoot = domRoot;
  
  /**
   * Maps unique ids of elements to integer positions in the child nodes array.
   * @type array
   * @private
   */
  this.idToPosition = {};
  
  /**
   * Maps integer positions from the child nodes array to elements.
   * @type array
   * @private
   */
  this.posToElement = {};
  
  /**
   * Maps uniques ids of elements to corresponding z-index change listeners.
   * @type array
   * @private
   */
  this.idToZICL = {};         
  
  /**
   * Number of elements in the DOM tree.
   * @type number
   * @private
   */         
  this.numElements = 0;
  
  /**
   * Age counter that allows unique age to be assigned to each element added,
   * resolving conflicts between elements of the same z-index.
   * @type number
   * @private
   */                 
  this.ageCounter = 0;
}

/**
 * @description Adds the element to the DOM presenter. This method should only
 * be called if the DOM presenter does not contain the element yet. 
 * @methodOf jsgl.elements.DomSorter#
 * @param {jsgl.elements.AbstractElement} element The element to be added.
 * @since version 2.0 
 */ 
jsgl.elements.DomSorter.prototype.add = function(element) {
  
  element.setAge(this.ageCounter++);
  
  this.domRoot.appendChild(element.getDomPresenter().getXmlElement());

  this.idToPosition[element.getUid()] = this.numElements;
  this.posToElement[this.numElements] = element;

  this.numElements ++;
    
  var zicl = jsgl.util.delegate(this, function() { this.update(element) });
  
  element.addZIndexChangeListener(zicl);
  this.idToZICL[element.getUid()] = zicl;
  
  this.update(element);
}

/**
 * @description Removes the element from the DOM presenter. 
 * @methodOf jsgl.elements.DomSorted#
 * @param {jsgl.elements.AbstractElement} element The element to be removed.
 * @since version 2.0
 */
jsgl.elements.DomSorter.prototype.remove = function(element) {
  
  var uid = element.getUid();

  element.setAge(-1);
  
  var position = this.idToPosition[uid];
  
  for(var i=position; i<this.numElements-1; i++) {
  
    this.posToElement[i] = this.posToElement[i+1];
    this.idToPosition[this.posToElement[i+1].getUid()] --;
  }
  
  this.idToPosition[uid] = null;
  this.posToElement[this.numElements-1] = null;
  
  element.removeZIndexChangeListener(this.idToZICL[uid]);
  this.idToZICL[uid] = null;

  this.domRoot.removeChild(element.getDomPresenter().getXmlElement());

  this.numElements --;
}  

/**
 * @description Updates the position of the element's DOM presenter's element
 * in the DOM tree after its z-index changes.
 * @methodOf jsgl.elements.DomSorter#
 * @param {jsgl.elements.AbstractElement} element The element whose XML node
 * position should be updated.
 * @since version 2.0
 */   
jsgl.elements.DomSorter.prototype.update = function(element) {

  /* Do not do updates on VML -- not only that they are not neccessary, but
     they are also harmful for rendering! */
  if(!jsgl.util.BrowserInfo.supportsSvg) {

    return;
  }

  // current position of the element in the DOM tree
  var currPos = this.idToPosition[element.getUid()];
  
  // new position of the element in the DOM tree (to be determined)
  var newPos = currPos;

  /* determine the new position in DOM (currently, by means of brute force --
     could be much improved) */    
  var changed;

  do {  

    changed = false;
    
    if(newPos != this.numElements-1 &&
        this.lessThan(this.posToElement[newPos+1], element)) {
      
      newPos ++;
      changed = true;
    }
    
    if(newPos != 0 && this.lessThan(element, this.posToElement[newPos-1])) {

      newPos --;
      changed = true;
    }
  }
  while(changed);
  
  // if the position hasn't changed, return
  if(currPos == newPos) {

    return;
  }

  this.domRoot.removeChild(element.getDomPresenter().getXmlElement());
  
  if(newPos < currPos) {
  
    for(var i=currPos; i>newPos; i--) {
    
      this.idToPosition[this.posToElement[i-1].getUid()] ++;
      this.posToElement[i] = this.posToElement[i-1];
    }
    
    this.domRoot.insertBefore(
      element.getDomPresenter().getXmlElement(),
      this.domRoot.childNodes.item(newPos));
  }
  else {
  
    for(var i=currPos; i<newPos; i++) {
    
      this.idToPosition[this.posToElement[i+1].getUid()] --;
      this.posToElement[i] = this.posToElement[i+1];
    }
    
    if(newPos != this.numElements - 1) {
    
      this.domRoot.insertBefore(
        element.getDomPresenter().getXmlElement(),
        this.domRoot.childNodes.item(newPos));
    }
    else {
    
      this.domRoot.appendChild(element.getDomPresenter().getXmlElement());
    }
  }

  this.idToPosition[element.getUid()] = newPos;
  this.posToElement[newPos] = element;

}

/**
 * @description Helper method for comparison of two elements according to their
 * z-index and age.
 * @methodOf jsgl.elements.DomSorter#
 * @param {boolean}
 * @since version 2.0
 */
jsgl.elements.DomSorter.prototype.lessThan = function(elementA, elementB) {

  if(elementA.getZIndex() == elementB.getZIndex()) {
  
    return elementA.getAge() < elementB.getAge();
  }
  
  return elementA.getZIndex() < elementB.getZIndex();
}