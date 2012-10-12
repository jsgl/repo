/**
 * @fileOverview <code>jsgl.util.Queue</code> class implementation.
 * @author Tomas Rehorek
 * @since version 1.0   
 */
 
/**
 * @class Simple FIFO structure implementation.
 * @constructor
 * @description Creates new instance of <code>jsgl.util.Queue</code>.
 * @since version 1.0
 */    
jsgl.util.Queue = function() {

  /**
   * Head element of the queue.
   * @type value
   * @private
   */           
  this.first = null;
  
  /**
   * Tailing element of the queue.
   * @type value
   * @private
   */         
  this.last = null;
  
  /**
   * Number of elements in the queue.
   * @type number
   * @private
   */   
  this.count = 0;
}

/**
 * @description Adds an item to the end of the queue.
 * @methodOf jsgl.util.Queue#
 * @param {value} item The item to enqueued.
 * @since version 1.0
 */  
jsgl.util.Queue.prototype.enqueue = function(item) {

  if(this.first == null) {
    this.first = this.last = { item : item, next : null };
  }
  else this.last.next = this.last = { item : item, next : null };
  this.count ++;
}

/**
 * @description Removes and returns the first element from the head of the queue.
 * If the queue is empty, <code>null</code> is returned. 
 * @methodOf jsgl.util.Queue#
 * @returns value
 * @since version 1.0
 */    
jsgl.util.Queue.prototype.dequeue = function() {

  var result = this.first && this.first.item;

  if(this.first != null) {
    if(this.last == this.first) this.last = null;
    this.first = this.first.next;
    this.count --;
  }

  return result;
}

/**
 * @description Returns the first element from the head of the queue, keeping
 * the item in the queue. If there are no elements in the Queue,
 * <code>null</code> is returned.
 * @methodOf jsgl.util.Queue#
 * @returns value
 * @since version 1.0
 */    
jsgl.util.Queue.prototype.peek = function() {

  return this.first && this.first.item;
}

/**
 * @description Gets the number of elements that are currently present in the queue.
 * @methodOf jsgl.util.Queue#
 * @returns number
 * @since version 1.0
 */    
jsgl.util.Queue.prototype.getCount = function() {

  return this.count;
}

/**
 * @description Returns string representation of the queue.
 * @methodOf jsgl.util.Queue#
 * @returns string
 * @since version 1.0
 */    
jsgl.util.Queue.prototype.toString = function() {

  var itemsStr = "";
  obj = this.first;
  while(obj)
  {
    if(obj != this.first) itemsStr += ",";
    itemsStr += obj.item;
    obj = obj.next;
  }
  return "Queue(count=" + this.getCount() + ",items=[" + itemsStr + "])";
}
