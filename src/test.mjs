import {optimize} from "./svgx.mjs"
import jsdom from "jsdom"
import process from "process"
import {removeURLQuotes, collapseSingleUse, styleToPresentation} from "./custom.mjs"
import {defaultPlugins} from "./svgo.mjs"

let plugins = [{plugin: styleToPresentation}, {plugin: collapseSingleUse}, ...defaultPlugins, {plugin: removeURLQuotes}]

let {JSDOM} = jsdom

let main = async () =>
{
	let dom = await JSDOM.fromFile(process.argv[2] || "/dev/stdin", {contentType: "image/svg+xml"})
	
	optimize(dom.window.document, {window: dom.window, plugins})
	
	process.stdout.write(dom.serialize())
}

main()
