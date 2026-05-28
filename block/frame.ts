import { dom } from "@typeup/dom"
import { mendly } from "mendly"
import { Source } from "../Source.js"
import { block } from "./block.js"

function parse(source: Source): dom.Block[] | undefined {
	let result: dom.Block[] | undefined
	if (source.readIf("!frame ")) {
		const frame = mendly.Uri.parse(source.till([" ", "\n"]).readAll() || "")
		const classes = source.readIf(" ") ? (source.till("\n").readAll() || "").split(" ") : []
		if (!source.readIf("\n")) source.raise("Expected newline as end of frame.")
		const region = source.mark()
		result = block.parse(source) || []
		if (frame) {
			if (result.length > 0 && result[0] instanceof dom.Block.Paragraph)
				result[0] = new dom.Block.Frame(frame, classes, (result[0] as dom.Block.Paragraph).content, region)
			else result.unshift(new dom.Block.Frame(frame, classes, [], region))
		}
	}
	return result
}
block.register(parse)
