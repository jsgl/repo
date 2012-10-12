jsgl.stroke.MiterJoinStyle=function(miterLimit)
{
  this.miterLimit=miterLimit;
}
jsgl.stroke.MiterJoinStyle.jsglExtend(jsgl.stroke.AbstractJoinStyle);

jsgl.stroke.MiterJoinStyle.prototype.applyToSvgElement=function(svgElement)
{
  svgElement.style.setProperty("stroke-linejoin","miter",null);
  svgElement.style.setProperty("stroke-miterlimit",this.miterLimit,null);
}

jsgl.stroke.MiterJoinStyle.prototype.applyToVmlStrokeElement=function(strokeElement)
{
  strokeElement.joinstyle="miter";
  strokeElement.miterlimit=this.miterLimit;
}

/* begin property: miterLimit */
jsgl.stroke.MiterJoinStyle.prototype.getMiterLimit=function()
{
  return this.miterLimit;
}

jsgl.stroke.MiterJoinStyle.prototype.setMiterLimit=function(miterLimit)
{
  this.miterLimit = miterLimit;
  this.onChangeRaiser.raiseEvent();
}
/* end property: miterLimit*/