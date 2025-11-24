import { dom } from "@typeup/dom"
import { Source } from "../Source"
import { block } from "./block"

function parse(source: Source): dom.Block[] | undefined {
	let result: dom.Block[] | undefined
	if (source.readIf("---\n")) {
		const region = source.mark()
		result = block.parse(source)
		const content: dom.Block[] = []
		let next: dom.Block | undefined
		while (
			result &&
			result.length > 0 &&
			!(result[0] instanceof dom.Block.Section) &&
			!(result[0] instanceof dom.Block.Chapter) &&
			(next = result.shift())
		)
			content.push(next)
		result = [new dom.Block.Section(content, region), ...(result || [])]
	}
	return result
}
block.register(parse, 1)
