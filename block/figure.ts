import { dom } from "@typeup/dom"
import { mendly } from "mendly"
import { Source } from "../Source"
import { block } from "./block"

function parse(source: Source): dom.Block[] | undefined {
	let result: dom.Block[] | undefined
	if (source.readIf("!figure ")) {
		const image = mendly.Uri.parse(source.till([" ", "\n"]).readAll()) || mendly.Uri.empty
		const classes = source.readIf(" ") ? (source.till("\n").readAll() || "").split(" ") : []
		if (!source.readIf("\n"))
			source.raise("Expected newline as end of figure.")
		const region = source.mark()
		result = block.parse(source) || []
		if (result.length > 0 && result[0] instanceof dom.Block.Paragraph)
			result[0] = new dom.Block.Figure(image, classes, (result[0] as dom.Block.Paragraph).content, region)
		else
			result.unshift(new dom.Block.Figure(image, classes, [], region))
	}
	return result
}
block.register(parse)
