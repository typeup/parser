import * as dom from "@typeup/dom"
import * as inline from "./inline"
import { Source } from "../Source"

function parse(source: Source): dom.inline.Inline[] | undefined {
	let result: dom.inline.Inline[] | undefined
	if (source.readIf("[")) {
		const target = source.till([" ", "]"]).readAll() || ""
		result = [new dom.inline.Link(target, source.readIf(" ") ? inline.parse(source.till("]")) || [] : [new dom.inline.Text(target, source.mark()) as dom.inline.Inline], source.mark())]
		if (!source.readIf("]"))
			source.raise("Expected \"]\" as end of link.")
	}
	return result
}
inline.addParser(parse)
