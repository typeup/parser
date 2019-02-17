import * as dom from "@typeup/dom"
import { Source } from "../Source"
import * as block from "./block"

function parse(source: Source): dom.block.Block[] | undefined {
	let result: dom.block.Block[] | undefined
	if (source.peek() == "\n") {
		source.read()
		result = [new dom.block.EmptyLine(source.mark())]
		const next = block.parse(source)
		if (next && next.length > 0)
			result = result.concat(next)
	}
	return result
}
block.addParser(parse)
block.addFilter(b => b && !(b instanceof dom.block.EmptyLine))
