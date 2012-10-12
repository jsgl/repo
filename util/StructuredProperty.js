jsgl.util.StructuredProperty=function(value)
{
  /* parent constructor call */
  jsgl.util.Property.call(this,value);
  
  this.internalChangeListener=jsgl.util.delegate(this.eventRaiser,this.eventRaiser.raiseEvent);
}
jsgl.util.StructuredProperty.jsglExtend(jsgl.util.Property);

jsgl.util.StructuredProperty.prototype.getInternalChangeListener=function()
{
  return this.internalChangeListener;
}