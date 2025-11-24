import { dom } from "@typeup/dom"
import { Source } from "../Source"
import { block } from "./block"

function parse(source: Source): dom.Block[] | undefined {
	let result: dom.Block[] | undefined
	if (source.readIf("%%")) {
		const language = (source.till("\n").readAll() || "").trim()
		if (!source.readIf("\n"))
			source.raise("Expected newline.")
		const code = source.till("%%").readAll() || ""
		if (!source.readIf("%%"))
			source.raise('Expected "%%" as end of code block.')
		source.readIf("\n")
		const region = source.mark()
		result = block.parse(source) || []
		if (result.length > 0 && result[0] instanceof dom.Block.Paragraph)
			result[0] = new dom.Block.Code(language, code.trim(), (result[0] as dom.Block.Paragraph).content, region)
		else
			result.unshift(new dom.Block.Code(language, code.trim(), [], region))
	}
	return result
}
block.register(parse)
