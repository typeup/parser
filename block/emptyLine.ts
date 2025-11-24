import { dom } from "@typeup/dom"
import { Source } from "../Source"
import { block } from "./block"

function parse(source: Source): dom.Block[] | undefined {
	let result: dom.Block[] | undefined
	if (source.peek() == "\n") {
		source.read()
		result = [new dom.Block.EmptyLine(source.mark())]
		const next = block.parse(source)
		if (next && next.length > 0)
			result = result.concat(next)
	}
	return result
}
block.register(parse)
block.addFilter(b => b && !(b instanceof dom.Block.EmptyLine))
