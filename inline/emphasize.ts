import * as dom from "@typeup/dom"
import * as inline from "./inline"
import { Source } from "../Source"

function parse(source: Source): dom.inline.Inline[] | undefined {
	let result: dom.inline.Inline[] | undefined
	if (source.readIf("_")) {
		result = [new dom.inline.Emphasize(inline.parse(source.till("_")) || [], source.mark())]
		if (!source.readIf("_"))
			source.raise("Expected \"_\" as end of emphasize.")
	}
	return result
}
inline.addParser(parse)
