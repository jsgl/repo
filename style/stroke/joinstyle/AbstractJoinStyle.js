jsgl.stroke.AbstractJoinStyle=function()
{
  this.onChangeRaiser=new EventRaiser();
}

jsgl.stroke.AbstractJoinStyle.prototype.applyToSvgElement=function(svgElement)
{
  throw "not implemented";
}

jsgl.stroke.AbstractJoinStyle.prototype.applyToVmlStrokeElement=function(strokeElement)
{
  throw "not implemented";
}

jsgl.stroke.AbstractJoinStyle.prototype.containsPointStrokeTest=function(
  point,vertexLocation,orientationA,orientationB,strokeWidth)
{
  return false;
}

jsgl.stroke.AbstractJoinStyle.prototype.registerChangeListener=function(listener)
{
  this.onChangeRaiser.registerListener(listener);
}

jsgl.stroke.AbstractJoinStyle.prototype.unregisterChangeListener=function(listener)
{
  this.onChangeRaiser.unregisterListener(listener);
}