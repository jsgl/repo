jsgl.stroke.RoundJoinStyle=function()
{
}
jsgl.stroke.RoundJoinStyle.jsglExtend(jsgl.stroke.AbstractJoinStyle);

jsgl.stroke.RoundJoinStyle.prototype.applyToSvgElement=function(svgElement)
{
  svgElement.style.setProperty("stroke-linejoin","round",null);
}

jsgl.stroke.RoundJoinStyle.prototype.applyToVmlStrokeElement=function(strokeElement)
{
  strokeElement.joinstyle="round";
}

jsgl.stroke.RoundJoinStyle.prototype.containsPointStrokeTest=function(
  point,vertexLocation,orientationA,orientationB,strokeWidth)
{
  return jsgl.Vector2D.getDistance(point, vertexLocation) <= strokeWidth/2;
}

jsgl.stroke.RoundJoinStyle.getInstance=jsgl.util.singletonInstanceGetter;