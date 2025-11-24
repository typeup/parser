import { dom } from "@typeup/dom"
import { Source } from "../Source"
import { block } from "./block"

function parse(source: Source): dom.Block[] | undefined {
	let result: dom.Block[] | undefined
	if (source.readIf("===\n")) {
		const region = source.mark()
		result = block.parseAll(source)
		const content: dom.Block[] = []
		let next: dom.Block | undefined
		while (result && result.length > 0 && !(result[0] instanceof dom.Block.Chapter) && (next = result.shift()))
			content.push(next)
		result = result ? [new dom.Block.Chapter(content, region), ...result] : [new dom.Block.Chapter(content, region)]
	}
	return result
}
block.register(parse)
