import { dom } from "@typeup/dom"
import { Source } from "../Source.js"
import { inline } from "./inline.js"

function parse(source: Source): dom.Inline[] | undefined {
	let result: dom.Inline[] | undefined
	if (source.readIf('"')) {
		result = [new dom.Inline.Quote(inline.parse(source.till('"')) || [], source.mark())]
		if (!source.readIf('"')) source.raise("Expected '\"' as end of inline quote.")
	}
	return result
}
inline.addParser(parse)
