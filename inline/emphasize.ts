import { dom } from "@typeup/dom"
import { Source } from "../Source"
import { inline } from "./inline"

function parse(source: Source): dom.Inline[] | undefined {
	let result: dom.Inline[] | undefined
	if (source.readIf("_")) {
		result = [new dom.Inline.Emphasize(inline.parse(source.till("_")) || [], source.mark())]
		if (!source.readIf("_"))
			source.raise('Expected "_" as end of emphasize.')
	}
	return result
}
inline.addParser(parse)
