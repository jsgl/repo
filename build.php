<?php

$directory = "./";

$files = array(
"namespaces.js",
"util/BrowserInfo.js",
"util/sugar.js",
"util/ArrayList.js",
"util/SortedList.js",
"util/Queue.js",
"util/CommandQueue.js",
"util/EventRaiser.js",
"util/Property.js",
"util/StructuredProperty.js",
"util/Singleton.js",
"util/Animator.js",

"global/Vector2D.js",

"style/stroke/AbstractStroke.js",
"style/stroke/DisabledStroke.js",
"style/stroke/SolidStroke.js",

"style/stroke/endcap/AbstractEndcapType.js",
"style/stroke/endcap/FlatEndcapType.js",
"style/stroke/endcap/RoundEndcapType.js",
"style/stroke/endcap/SquareEndcapType.js",

"style/stroke/joinstyle/AbstractJoinStyle.js",
"style/stroke/joinstyle/BevelJoinStyle.js",
"style/stroke/joinstyle/MiterJoinStyle.js",
"style/stroke/joinstyle/RoundJoinStyle.js",

"style/stroke/dashstyle/AbstractDashStyle.js",
"style/stroke/dashstyle/DashDashStyle.js",
"style/stroke/dashstyle/DashDotDashStyle.js",
"style/stroke/dashstyle/DotDashStyle.js",
"style/stroke/dashstyle/LongDashDashStyle.js",
"style/stroke/dashstyle/LongDashDotDashStyle.js",
"style/stroke/dashstyle/LongDashDotDotDashStyle.js",
"style/stroke/dashstyle/ShortDashDotDashStyle.js",
"style/stroke/dashstyle/SolidDashStyle.js",

"style/fill/AbstractFill.js",
"style/fill/DisabledFill.js",
"style/fill/SolidFill.js",

"elements/AbstractElement.js",
"elements/AbstractDomPresenter.js",
"elements/DomSorter.js",

"elements/group/GroupElement.js",
"elements/group/SvgGroupDomPresenter.js",
"elements/group/NonSvgGroupDomPresenter.js",

"elements/curve/CurveElement.js",
"elements/curve/SvgCurveDomPresenter.js",
"elements/curve/VmlCurveDomPresenter.js",

"elements/circle/CircleElement.js",
"elements/circle/SvgCircleDomPresenter.js",
"elements/circle/VmlCircleDomPresenter.js",

"elements/ellipse/EllipseElement.js",
"elements/ellipse/SvgEllipseDomPresenter.js",
"elements/ellipse/VmlEllipseDomPresenter.js",

"elements/rectangle/RectangleElement.js",
"elements/rectangle/SvgRectangleDomPresenter.js",
"elements/rectangle/VmlRectangleDomPresenter.js",

"elements/line/LineElement.js",
"elements/line/SvgLineDomPresenter.js",
"elements/line/VmlLineDomPresenter.js",

"elements/label/LabelElement.js",
"elements/label/SvgLabelDomPresenter.js",
"elements/label/NonSvgLabelDomPresenter.js",

"elements/polygonal/AbstractPolygonalElement.js",

"elements/polygonal/polygon/PolygonElement.js",
"elements/polygonal/polygon/SvgPolygonDomPresenter.js",
"elements/polygonal/polygon/VmlPolygonDomPresenter.js",

"elements/polygonal/polyline/PolylineElement.js",
"elements/polygonal/polyline/SvgPolylineDomPresenter.js",
"elements/polygonal/polyline/VmlPolylineDomPresenter.js",

"elements/image/ImageElement.js",
"elements/image/AbstractImageDomPresenter.js",
"elements/image/SvgImageDomPresenter.js",
"elements/image/VmlImageDomPresenter.js",

"elements/shape/ShapeElement.js",
"elements/shape/SvgShapeDomPresenter.js",
"elements/shape/VmlShapeDomPresenter.js",

"panel/Panel.js",
"panel/AbstractPanelDomPresenter.js",
"panel/NonSvgPanelDomPresenter.js",
"panel/SvgPanelDomPresenter.js",

"global/DashStyles.js",
"global/JoinStyles.js",
"global/EndcapTypes.js",
"global/Cursor.js",

"global/VerticalAnchor.js",
"global/HorizontalAnchor.js",

"global/MouseEvent.js",

"path/AbstractPathSegment.js",
"path/AbstractMoveTo.js",
"path/AbsoluteMoveTo.js",
"path/RelativeMoveTo.js",
"path/AbstractLineTo.js",
"path/AbsoluteLineTo.js",
"path/RelativeLineTo.js",
"path/ClosePath.js",
"path/AbsoluteHorizontalLineTo.js",
"path/RelativeHorizontalLineTo.js",
"path/AbsoluteVerticalLineTo.js",
"path/RelativeVerticalLineTo.js",
"path/AbstractCubicBezier.js",
"path/AbsoluteCubicBezier.js",
"path/RelativeCubicBezier.js",
"path/AbstractSmoothCubicBezier.js",
"path/AbsoluteSmoothCubicBezier.js",
"path/RelativeSmoothCubicBezier.js",
"path/AbstractQuadraticBezier.js",
"path/AbsoluteQuadraticBezier.js",
"path/RelativeQuadraticBezier.js",
"path/AbstractSmoothQuadraticBezier.js",
"path/AbsoluteSmoothQuadraticBezier.js",
"path/RelativeSmoothQuadraticBezier.js",
"path/AbstractEllipticalArc.js",
"path/AbsoluteEllipticalArc.js",
"path/RelativeEllipticalArc.js");

for($i=0;$i<count($files);$i++)
{
  if(strstr($files[$i],".js")!==FALSE)
  {
    $file = fopen($directory.$files[$i], "r") or exit("Unable to open file!");

    while(!feof($file)) {    
    
      echo fgets($file);
    }
    fclose($file);
    echo ";";
  }
}

?>