export let removeURLQuotes =
{
	fn: item =>
	{
		if(!item.isElem()) return
		
		for(let name in item.attrs)
		{
			let attr = item.attrs[name]
			let value = attr.value
			if(value.startsWith("url('") && value.endsWith("')"))
				attr.value = `url(${value.slice(5, -2)})`
		}
	},
}

export let collapseSingleUse =
{
	type: "full",
	fn: item =>
	{
		let referenced = {}
		let referencedOnce = {}
		let references = {}
		
		let action = item =>
		{
			if(item.hasAttr("id"))
				referenced[item.attr("id").value] = item
			
			let href
			
			if(item.hasAttr("href") && item.attr("href").value.startsWith("#"))
				href = item.attr("href").value
			else if(item.hasAttr("xlink:href") && item.attr("xlink:href").value.startsWith("#"))
				href = item.attr("xlink:href").value
			
			if(href)
			{
				let id = href.slice(1)
				if(item.elem === "use")
				{
					referencedOnce[id] = referencedOnce[id] === undefined
					if(referencedOnce[id]) references[id] = item
				}
				else
				{
					referencedOnce[id] = false
				}
			}
			
			for(let name in item.attrs)
			{
				let value = item.attrs[name].value
				
				let match = value.match(/\burl\(("|')?#(.+?)\1\)/)
				if(match)
					referencedOnce[match[2]] = false
			}
		}
		
		let walk = item =>
		{
			if(!item.isElem()) return
			
			action(item)
			
			if(!item.content) return
			
			for(let child of item.content)
				walk(child)
		}
		
		walk(item)
		
		for(let id in referenced)
		{
			let item = referenced[id]
			switch(referencedOnce[id])
			{
				case undefined:
					item.removeAttr("id")
					break
				case true:
					let parent = item.parentNode
					if(!parent.isElem("defs")) break
					let replaced = references[id]
					item.removeAttr("id")
					replaced.removeAttr("href")
					replaced.renameElem("g")
					replaced.content = [item]
					break
			}
		}
		
		return item
	},
}

export let styleToPresentation =
{
	fn: item =>
	{
		if(!item.isElem()) return
		let length = item.style.length
		if(!length) return
		for(let i = 0; i < length; i++)
			item.addAttr({name: item.style.item(i), value: item.style.getPropertyValue(item.style.item(i))})
		item.removeAttr("style")
	}
}
