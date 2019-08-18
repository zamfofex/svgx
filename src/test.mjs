import {optimize} from "./svgx.mjs"
import jsdom from "jsdom"
import process from "process"
import {removeURLQuotes, collapseSingleUse, styleToPresentation} from "./custom.mjs"
import {defaultPlugins} from "./svgo.mjs"

let plugins = [{plugin: styleToPresentation}, ...defaultPlugins, {plugin: removeURLQuotes}, {plugin: collapseSingleUse}]

let {JSDOM} = jsdom

let main = async () =>
{
	let dom = await JSDOM.fromFile(process.argv[2] || "/dev/stdin", {contentType: "image/svg+xml"})
	
	let data
	
	for(let i = 0; i < 16; i++)
	{
		optimize(dom.window.document, {window: dom.window, plugins})
		let newdata = dom.serialize()
		if(data === newdata) break
		data = newdata
	}
	
	process.stdout.write(data)
}

main()
