import * as dom from "@typeup/dom"
import { Source } from "../Source"
import * as block from "./block"

function parse(source: Source): dom.block.Block[] | undefined {
	let result: dom.block.Block[] | undefined
	if (source.readIf("$$")) {
		source.readIf("\n")
		const math = source.till("$$").readAll() || ""
		if (!source.readIf("$$"))
			source.raise("Expected \"$$\" as end of math block.")
		source.readIf("\n")
		const region = source.mark()
		result = block.parse(source) || []
		if (result.length > 0 && result[0] instanceof dom.block.Paragraph)
			result[0] = new dom.block.Math(math, (result[0] as dom.block.Paragraph).content, region)
		else
			result.unshift(new dom.block.Math(math, [], region))
	}
	return result
}
block.addParser(parse)
