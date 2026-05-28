import { dom } from "@typeup/dom"
import { inline } from "../inline/index.js"
import { Source } from "../Source.js"
import { block } from "./block.js"
import { definitionData } from "./definitionData.js"

function parse(source: Source): dom.Block[] | undefined {
	const content = inline.parse(source.until("\n"))
	let result: dom.Block[] | undefined
	if (content && content.length > 0) {
		const definition = definitionData.parse(source)
		if (definition) {
			const definitions = new dom.Block.List.Definition([new dom.Block.List.Definition.Term(content, definition)])
			const next = block.parse(source)
			if (next && next.length > 0 && next[0] instanceof dom.Block.List.Definition)
				definitions.content.push(...(next.shift() as dom.Block.List.Definition).content)
			result = [definitions, ...(next || [])]
		} else {
			const next = block.parse(source) || []
			result =
				next && next.length > 0 && next[0] instanceof dom.Block.Paragraph
					? [new dom.Block.Paragraph(content.concat((next[0] as dom.Block.Paragraph).content)) as dom.Block].concat(
							next.slice(1)
						)
					: [new dom.Block.Paragraph(content) as dom.Block].concat(next)
		}
	}
	return result
}
block.register(parse, -1)
