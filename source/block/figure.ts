import { Uri } from "@cogneco/mend"
import * as dom from "@typeup/dom"
import { Source } from "../Source"
import * as block from "./block"

function parse(source: Source): dom.block.Block[] | undefined {
	let result: dom.block.Block[] | undefined
	if (source.readIf("!figure ")) {
		const image = Uri.Locator.parse(source.till([" ", "\n"]).readAll())
		const classes = source.readIf(" ") ? (source.till("\n").readAll() || "").split(" ") : []
		if (!source.readIf("\n"))
			source.raise("Expected newline as end of figure.")
		const region = source.mark()
		result = block.parse(source) || []
		if (result.length > 0 && result[0] instanceof dom.block.Paragraph)
			result[0] = new dom.block.Figure(image, classes, (result[0] as dom.block.Paragraph).content, region)
		else
			result.unshift(new dom.block.Figure(image, classes, [], region))
	}
	return result
}
block.addParser(parse)
