import {optimize} from "./svgx.mjs"
import {defaultPlugins} from "./svgo.mjs"
import {removeURLQuotes, collapseSingleUse, styleToPresentation} from "./custom.mjs"

let input = document.querySelector("textarea")
let output = document.querySelector("#output")
let parser = new DOMParser()
let outOriginal = document.querySelector("#original")
let outOptimized = document.querySelector("#optimized")

document.querySelector("button").addEventListener("click", () =>
{
	outOriginal.contentDocument.body.textContent = ""
	outOptimized.contentDocument.body.textContent = ""
	
	let doc = parser.parseFromString(input.value, "image/svg+xml")
	
	let optimized = doc.documentElement
	let original = optimized.cloneNode(true)
	
	optimize(doc, {window, plugins: [{plugin: collapseSingleUse}, {plugin: styleToPresentation}, ...defaultPlugins(), {plugin: removeURLQuotes}]})
	
	outOriginal.contentDocument.body.append(original)
	outOptimized.contentDocument.body.append(optimized)
	
	output.textContent = optimized.outerHTML
})
