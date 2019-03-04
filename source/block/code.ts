import * as dom from "@typeup/dom"
import { Source } from "../Source"
import * as block from "./block"

function parse(source: Source): dom.block.Block[] | undefined {
	let result: dom.block.Block[] | undefined
	if (source.readIf("%%")) {
		const language = (source.till("\n").readAll() || "").trim()
		if (!source.readIf("\n"))
			source.raise("Expected newline.")
		const code = source.till("%%").readAll() || ""
		if (!source.readIf("%%"))
			source.raise("Expected \"%%\" as end of code block.")
		source.readIf("\n")
		const region = source.mark()
		result = block.parse(source) || []
		if (result.length > 0 && result[0] instanceof dom.block.Paragraph)
			result[0] = new dom.block.Code(language, code, (result[0] as dom.block.Paragraph).content, region)
		else
			result.unshift(new dom.block.Code(language, code, [], region))
	}
	return result
}
block.addParser(parse)
