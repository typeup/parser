import * as dom from "@typeup/dom"
import * as inline from "./inline"
import { Source } from "../Source"

function parse(source: Source): dom.inline.Inline[] | undefined {
	let result: dom.inline.Inline[] | undefined
	if (source.readIf("%")) {
		result = [new dom.inline.Code(source.till("%").readAll() || "", source.mark())]
		if (!source.readIf("%"))
			source.raise("Expected \"%\" as end of inline code.")
	}
	return result
}
inline.addParser(parse)
