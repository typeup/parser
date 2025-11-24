import { dom } from "@typeup/dom"
import { Source } from "../Source"
import { block } from "./block"

function parse(source: Source): dom.Block[] | undefined {
	let result: dom.Block[] | undefined
	if (source.readIf("$$")) {
		source.readIf("\n")
		const math = source.till("$$").readAll() || ""
		if (!source.readIf("$$"))
			source.raise('Expected "$$" as end of math block.')
		source.readIf("\n")
		const region = source.mark()
		result = block.parse(source) || []
		if (result.length > 0 && result[0] instanceof dom.Block.Paragraph)
			result[0] = new dom.Block.Math(math, (result[0] as dom.Block.Paragraph).content, region)
		else
			result.unshift(new dom.Block.Math(math, [], region))
	}
	return result
}
block.register(parse)
