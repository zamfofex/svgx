let cache = Symbol("svgx cache")

let attribute = attr =>
{
	if(attr[cache]) return attr[cache]
	let ret =
	{
		get prefix() { return attr.prefix },
		set prefix(value) { attr.prefix = value },
		get local() { return attr.localName },
		set local(value) { attr.localName = value },
		get name() { return attr.name },
		set name(value) { attr.name = value },
		get value() { return attr.value },
		set value(value) { attr.value = value },
	}
	attr[cache] = ret
	return ret
}

let svgx = window => node =>
{
	if(node[cache]) return node[cache]
	
	let self =
	{
		get node() { return node },
		isElem: (names = []) =>
		{
			if(!(names instanceof Array))
				names = [names]
			
			if(!names.length) return node instanceof window.Element || node instanceof window.Document
			
			return names.some(name => node.nodeName === name)
		},
		isEmpty: () => node.childNodes.length === 0,
		renameElem: name =>
		{
			let element = window.document.createElementNS("http://www.w3.org/2000/svg", name)
			element.append(...node.childNodes)
			node.replaceWith(element)
			for(let name of node.getAttributeNames())
				element.setAttribute(name, node.getAttribute(name))
			element[cache] = self
			delete node[cache]
			node = element
			return self
		},
		clone: () => svgx(window)(node.cloneNode(true)),
		hasAttr: (name, value) =>
		{
			if(!(node instanceof window.Element)) return false
			if(name === undefined) return node.getAttributeNames().length !== 0
			let val = node.getAttribute(name)
			if(value === undefined) return val !== null
			return val === value
		},
		attr: name =>
		{
			if(!(node instanceof window.Element)) return null
			if(!node.hasAttribute(name)) return null
			return attribute(node.getAttributeNode(name))
		},
		removeAttr: (name, value) =>
		{
			if(!(node instanceof window.Element)) return
			if(name instanceof Array) for(let n of name) self.removeAttr(n)
			if(value !== undefined && value !== node.getAttribute(name))
				return false
			let had = node.hasAttribute(name)
			node.removeAttribute(name)
			return had
		},
		addAttr: attr => node.setAttribute(attr.name, attr.value),
		eachAttr: (callback, ctx) =>
		{
			let f = callback.bind(ctx)
			for(let attr of self.attrs) f(attr)
		},
		querySelectorAll: selector => [...node.querySelectorAll(selector)].map(svgx(window)),
		querySelector: selector => svgx(window)(node.querySelector(selector)),
		matches: selector => node.matches(selector),
		style:
		{
			getCssText: () => node.getAttribute("style"),
			getPropertyPriority: name => node.style.getPropertyPriority(name),
			getPropertyValue: name => node.style.getPropertyValue(name),
			item: name => node.style.item(name),
			get length() { return node.style.length },
			removeProperty: name => node.style.removeProperty(name),
			setProperty: (name, value, priority = "") => node.style.setProperty(name, value, priority),
		},
		get elem()
		{
			if(self.isElem()) return node.nodeName
		},
		get processinginstruction()
		{
			if(node instanceof window.ProcessingInstruction)
				return {name: node.target, body: node.data}
		},
		get doctype()
		{
			if(node instanceof window.DocumentType)
				return "svg"
		},
		get comment()
		{
			if(node instanceof window.Comment)
				return node.data
		},
		get cdata()
		{
			if(node instanceof window.CDATASection)
				return node.data
		},
		get text()
		{
			if(node instanceof window.Text)
				return node.data
		},
		get content()
		{
			let ret = [...node.childNodes].map(svgx(window))
			return ret
		},
		set content(items)
		{
			node.textContent = ""
			node.append(...items.map(items => items.node))
		},
		get attrs()
		{
			if(!(node instanceof window.Element)) return []
			let ret = []
			for(let attr of node.attributes)
				ret.push(attribute(attr))
			return ret
		},
		get parentNode()
		{
			return svgx(window)(node.parentNode)
		},
		set parentNode(item)
		{
			item.node.append(node)
		},
		computedAttr: (name, expected) =>
		{
			if(!(node instanceof window.Element))
			{
				if(expected === undefined)
					return null
				else
					return false
			}
			
			for(let current = node; current; current = current.parentElement)
			{
				let value = current.getAttribute(name)
				if(value)
				{
					if(expected === undefined)
						return value
					else
						return value === expected
				}
			}
		},
		spliceContent: (index, count, items) =>
		{
			for(let i = count; i > 0; i--)
				node.childNodes[index].remove()
			let child = node.childNodes[index]
			if(child) child.before(...items.map(item => item.node))
			else node.append(...items.map(item => item.node))
		},
		someAttr: (f, ctx) => self.attrs.some(f.bind(ctx)),
	}
	node[cache] = self
	return self
}

export let optimize = (svg, {window, plugins = {}} = {}) =>
{
	let last = null
	let group
	for(let {plugin: {type, fn, params: defaultParams}, params: userParams = {}} of [...plugins, {plugin: {type: true}}])
	{
		let params
		if(defaultParams) params = {...defaultParams, ...userParams}
		if(!type) type = "perItem"
		if(type === last)
		{
			group.push({fn, params})
		}
		else
		{
			switch(last)
			{
				case "full":
					for(let {fn, params} of group)
						fn(svgx(window)(svg), params, {})
					break
				case "perItem":
					let forwards = node =>
					{
						for(let child of [...node.childNodes])
						{
							for(let {fn, params} of group)
								if(fn(svgx(window)(child), params, {}) === false)
									child.remove()
							forwards(child)
						}
					}
					forwards(svg)
					break
				case "perItemReverse":
					let backwards = node =>
					{
						for(let child of [...node.childNodes])
						{
							backwards(child)
							for(let {fn, params} of group)
								if(fn(svgx(window)(child), params, {}) === false)
									child.remove()
						}
					}
					backwards(svg)
					break
			}
			group = [{fn, params}]
			last = type
		}
	}
}
