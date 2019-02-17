import * as dom from "@typeup/dom"
import { Source } from "../Source"
import * as block from "./block"

function parse(source: Source): dom.block.Block[] | undefined {
	let result: dom.block.Block[] | undefined
	if (source.readIf("---\n")) {
		const region = source.mark()
		result = block.parse(source)
		const content: dom.block.Block[] = []
		let next: dom.block.Block | undefined
		while (result && result.length > 0 && !(result[0] instanceof dom.block.Section) && !(result[0] instanceof dom.block.Chapter) && (next = result.shift()))
			content.push(next)
		result = [new dom.block.Section(content, region), ...(result || [])]
	}
	return result
}
block.addParser(parse, 1)
