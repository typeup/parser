import { dom } from "@typeup/dom"
import { Source } from "../Source"
import { block } from "./block"

function parse(source: Source): dom.Block[] | undefined {
	let peeked = ""
	let p: string | undefined
	while ((p = source.peekIs(peeked + "\t")))
		peeked = p
	let result: dom.Block[] | undefined
	if (source.readIf(peeked + "1.")) {
		while ((source.peek() || "").match(/\s/))
			source.read()
		const current = new dom.Block.List.Item(block.parseAll(source.requirePrefix("\t")) || [], source.mark())
		const next = block.parse(source)
		let index = 0
		while (next && next.length > 0 && next[index] instanceof dom.Block.EmptyLine)
			index++
		if (next && next.length > 0 && next[index] instanceof dom.Block.List.Ordered) {
			while (index-- > 0)
				next.shift()
			next[0] = new dom.Block.List.Ordered([current].concat((next[0] as dom.Block.List.Ordered).content))
			result = next
		} else {
			result = [new dom.Block.List.Ordered([current])]
			if (next && next.length > 0)
				result = result.concat(next)
		}
	}
	return result
}
block.register(parse)
