import { dom } from "@typeup/dom"
import { Source } from "../Source.js"
import { block } from "./block.js"

function parse(source: Source): dom.Block[] | undefined {
	let result: dom.Block[] | undefined
	if (source.readIf('"""\n')) {
		const innerSource = source.till('"""')
		const content = block.parseAll(innerSource) || []
		if (!source.readIf('"""')) source.raise('Expected """ as end of quote block.')
		const cite = source.readIf(" ") ? (source.till("\n").readAll() || "").trim() || undefined : undefined
		source.readIf("\n")
		const region = source.mark()
		result = block.parse(source) || []
		if (result.length > 0 && result[0] instanceof dom.Block.Paragraph)
			result[0] = new dom.Block.Quote(content, cite, (result[0] as dom.Block.Paragraph).content, region)
		else result.unshift(new dom.Block.Quote(content, cite, undefined, region))
	}
	return result
}
block.register(parse)
