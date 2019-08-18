import removeDoctype from "svgo/plugins/removeDoctype.js"
import removeXMLProcInst from "svgo/plugins/removeXMLProcInst.js"
import removeComments from "svgo/plugins/removeComments.js"
import removeMetadata from "svgo/plugins/removeMetadata.js"
import removeXMLNS from "svgo/plugins/removeXMLNS.js"
import removeEditorsNSData from "svgo/plugins/removeEditorsNSData.js"
import cleanupAttrs from "svgo/plugins/cleanupAttrs.js"
import inlineStyles from "svgo/plugins/inlineStyles.js"
import minifyStyles from "svgo/plugins/minifyStyles.js"
import convertStyleToAttrs from "svgo/plugins/convertStyleToAttrs.js"
import cleanupIDs from "svgo/plugins/cleanupIDs.js"
import prefixIds from "svgo/plugins/prefixIds.js"
import removeRasterImages from "svgo/plugins/removeRasterImages.js"
import removeUselessDefs from "svgo/plugins/removeUselessDefs.js"
import cleanupNumericValues from "svgo/plugins/cleanupNumericValues.js"
import cleanupListOfValues from "svgo/plugins/cleanupListOfValues.js"
import convertColors from "svgo/plugins/convertColors.js"
import removeUnknownsAndDefaults from "svgo/plugins/removeUnknownsAndDefaults.js"
import removeNonInheritableGroupAttrs from "svgo/plugins/removeNonInheritableGroupAttrs.js"
import removeUselessStrokeAndFill from "svgo/plugins/removeUselessStrokeAndFill.js"
import removeViewBox from "svgo/plugins/removeViewBox.js"
import cleanupEnableBackground from "svgo/plugins/cleanupEnableBackground.js"
import removeHiddenElems from "svgo/plugins/removeHiddenElems.js"
import removeEmptyText from "svgo/plugins/removeEmptyText.js"
import convertShapeToPath from "svgo/plugins/convertShapeToPath.js"
import convertEllipseToCircle from "svgo/plugins/convertEllipseToCircle.js"
import moveElemsAttrsToGroup from "svgo/plugins/moveElemsAttrsToGroup.js"
import moveGroupAttrsToElems from "svgo/plugins/moveGroupAttrsToElems.js"
import collapseGroups from "./collapseGroups.js" // Note: This plugin is not compatible.
import convertPathData from "svgo/plugins/convertPathData.js"
import convertTransform from "svgo/plugins/convertTransform.js"
import removeEmptyAttrs from "svgo/plugins/removeEmptyAttrs.js"
import removeEmptyContainers from "svgo/plugins/removeEmptyContainers.js"
import mergePaths from "svgo/plugins/mergePaths.js"
import removeUnusedNS from "svgo/plugins/removeUnusedNS.js"
import sortAttrs from "svgo/plugins/sortAttrs.js"
import removeTitle from "svgo/plugins/removeTitle.js"
import removeDesc from "svgo/plugins/removeDesc.js"
import removeDimensions from "svgo/plugins/removeDimensions.js"
import removeAttrs from "svgo/plugins/removeAttrs.js"
import removeAttributesBySelector from "svgo/plugins/removeAttributesBySelector.js"
import removeElementsByAttr from "svgo/plugins/removeElementsByAttr.js"
import addClassesToSVGElement from "svgo/plugins/addClassesToSVGElement.js"
import removeStyleElement from "svgo/plugins/removeStyleElement.js"
import removeScriptElement from "svgo/plugins/removeScriptElement.js"
import addAttributesToSVGElement from "svgo/plugins/addAttributesToSVGElement.js"
// import removeOffCanvasPaths from "svgo/plugins/removeOffCanvasPaths.js"
import reusePaths from "svgo/plugins/reusePaths.js"

let removeEmptyTextNodes =
{
	active: true,
	fn: item =>
	{
		if(typeof item.text === "string" && !/\w/.test(item.text))
			return false
	}
}

export let defaultPlugins =
[
	{plugin: removeEmptyTextNodes},
	{plugin: removeDoctype},
	{plugin: removeXMLProcInst},
	{plugin: removeComments},
	{plugin: removeMetadata},
	{plugin: removeXMLNS},
	{plugin: removeEditorsNSData},
	{plugin: cleanupAttrs},
	{plugin: inlineStyles},
	{plugin: minifyStyles},
	{plugin: convertStyleToAttrs},
	{plugin: cleanupIDs},
	{plugin: prefixIds},
	{plugin: removeRasterImages},
	{plugin: removeUselessDefs},
	// {plugin: cleanupNumericValues},
	{plugin: cleanupListOfValues},
	{plugin: convertColors},
	{plugin: removeUnknownsAndDefaults, params: {defaultAttrs: false, uselessOverrides: false}},
	{plugin: removeNonInheritableGroupAttrs},
	{plugin: removeUselessStrokeAndFill},
	{plugin: removeViewBox},
	{plugin: cleanupEnableBackground},
	{plugin: removeHiddenElems, params: {pathEmptyD: false}},
	{plugin: removeEmptyText},
	{plugin: convertShapeToPath},
	{plugin: convertEllipseToCircle},
	{plugin: moveElemsAttrsToGroup},
	{plugin: moveGroupAttrsToElems},
	{plugin: collapseGroups},
	{plugin: convertPathData},
	{plugin: convertTransform},
	{plugin: removeEmptyAttrs},
	{plugin: removeEmptyContainers},
	{plugin: mergePaths},
	{plugin: removeUnusedNS},
	{plugin: sortAttrs},
	{plugin: removeTitle},
	{plugin: removeDesc},
	{plugin: removeDimensions},
	{plugin: removeAttrs},
	{plugin: removeAttributesBySelector},
	{plugin: removeElementsByAttr},
	{plugin: addClassesToSVGElement},
	{plugin: removeStyleElement},
	{plugin: removeScriptElement},
	{plugin: addAttributesToSVGElement},
	// {plugin: removeOffCanvasPaths},
	{plugin: reusePaths},
].filter(info => info.plugin.active)
