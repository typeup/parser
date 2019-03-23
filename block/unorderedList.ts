import * as dom from "@typeup/dom"
import { Source } from "../Source"
import * as block from "./block"

function parse(source: Source): dom.block.Block[] | undefined {
	let peeked = ""
	let p: string | undefined
	while (p = source.peekIs(peeked + "\t"))
		peeked = p
	let result: dom.block.Block[] | undefined
	if (source.readIf(peeked + "-")) {
		while ((source.peek() || "").match(/\s/))
			source.read()
		const current = new dom.block.ListItem(block.parseAll(source.requirePrefix("\t")) || [], source.mark())
		const next = block.parse(source)
		let index = 0
		while (next && next.length > 0 && next[index] instanceof dom.block.EmptyLine)
			index++
		if (next && next.length > 0 && next[index] instanceof dom.block.UnorderedList) {
			while (index-- > 0)
				next.shift()
			next[0] = new dom.block.UnorderedList([current].concat((next[0] as dom.block.UnorderedList).content))
			result = next
		} else {
			result = [new dom.block.UnorderedList([current])]
			if (next && next.length > 0)
				result = result.concat(next)
		}
	}
	return result
}
block.addParser(parse)
