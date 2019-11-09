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

export let defaultPlugins = (o = {}) =>
[
	{...o.removeEmptyTextNodes, plugin: removeEmptyTextNodes},
	{...o.removeDoctype, plugin: removeDoctype},
	{...o.removeXMLProcInst, plugin: removeXMLProcInst},
	{...o.removeComments, plugin: removeComments},
	{...o.removeMetadata, plugin: removeMetadata},
	{...o.removeXMLNS, plugin: removeXMLNS},
	{...o.removeEditorsNSData, plugin: removeEditorsNSData},
	{...o.cleanupAttrs, plugin: cleanupAttrs},
	{...o.inlineStyles, plugin: inlineStyles},
	{...o.minifyStyles, plugin: minifyStyles},
	{...o.convertStyleToAttrs, plugin: convertStyleToAttrs},
	{...o.cleanupIDs, plugin: cleanupIDs},
	{...o.prefixIds, plugin: prefixIds},
	{...o.removeRasterImages, plugin: removeRasterImages},
	{...o.removeUselessDefs, plugin: removeUselessDefs},
	// {...o.cleanupNumericValues, plugin: cleanupNumericValues},
	{...o.cleanupListOfValues, plugin: cleanupListOfValues},
	{...o.convertColors, plugin: convertColors},
	{params: {defaultAttrs: false, uselessOverrides: false}, ...o.removeUnknownsAndDefaults, plugin: removeUnknownsAndDefaults},
	{...o.removeNonInheritableGroupAttrs, plugin: removeNonInheritableGroupAttrs},
	{...o.removeUselessStrokeAndFill, plugin: removeUselessStrokeAndFill},
	{...o.removeViewBox, plugin: removeViewBox},
	{...o.cleanupEnableBackground, plugin: cleanupEnableBackground},
	{params: {pathEmptyD: false}, ...o.removeHiddenElems, plugin: removeHiddenElems},
	{...o.removeEmptyText, plugin: removeEmptyText},
	{...o.convertShapeToPath, plugin: convertShapeToPath},
	{...o.convertEllipseToCircle, plugin: convertEllipseToCircle},
	{...o.moveElemsAttrsToGroup, plugin: moveElemsAttrsToGroup},
	{...o.moveGroupAttrsToElems, plugin: moveGroupAttrsToElems},
	{...o.collapseGroups, plugin: collapseGroups},
	{...o.convertPathData, plugin: convertPathData},
	{...o.convertTransform, plugin: convertTransform},
	{...o.removeEmptyAttrs, plugin: removeEmptyAttrs},
	{...o.removeEmptyContainers, plugin: removeEmptyContainers},
	{...o.mergePaths, plugin: mergePaths},
	{...o.removeUnusedNS, plugin: removeUnusedNS},
	{...o.sortAttrs, plugin: sortAttrs},
	{...o.removeTitle, plugin: removeTitle},
	{...o.removeDesc, plugin: removeDesc},
	{...o.removeDimensions, plugin: removeDimensions},
	{...o.removeAttrs, plugin: removeAttrs},
	{...o.removeAttributesBySelector, plugin: removeAttributesBySelector},
	{...o.removeElementsByAttr, plugin: removeElementsByAttr},
	{...o.addClassesToSVGElement, plugin: addClassesToSVGElement},
	{...o.removeStyleElement, plugin: removeStyleElement},
	{...o.removeScriptElement, plugin: removeScriptElement},
	{...o.addAttributesToSVGElement, plugin: addAttributesToSVGElement},
	// {...o.removeOffCanvasPaths, plugin: removeOffCanvasPaths},
	{...o.reusePaths, plugin: reusePaths},
].filter(info => info.active === undefined ? info.plugin.active : info.active)
