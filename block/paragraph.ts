import * as dom from "@typeup/dom"
import { Source } from "../Source"
import * as inline from "../inline"
import * as block from "./block"

function parse(source: Source): dom.block.Block[] | undefined {
	const content = inline.parse(source.until("\n"))
	let result: dom.block.Block[] | undefined
	if (content && content.length > 0) {
		const next = block.parse(source) || []
		result = (next && next.length > 0 && next[0] instanceof dom.block.Paragraph) ?
		[new dom.block.Paragraph(content.concat((next[0] as dom.block.Paragraph).content)) as dom.block.Block].concat(next.slice(1)) :
		[new dom.block.Paragraph(content) as dom.block.Block].concat(next)
	}
	return result
}
block.addParser(parse, -1)
