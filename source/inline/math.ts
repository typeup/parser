import * as dom from "@typeup/dom"
import { Source } from "../Source"
import * as inline from "./inline"

function parse(source: Source): dom.inline.Inline[] | undefined {
	let result: dom.inline.Inline[] | undefined
	if (source.readIf("$")) {
		result = [new dom.inline.Math(source.till("$").readAll() || "", source.mark())]
		if (!source.readIf("$"))
			source.raise("Expected \"$\" as end of inline math.")
	}
	return result
}
inline.addParser(parse)
