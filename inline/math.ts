import { dom } from "@typeup/dom"
import { Source } from "../Source"
import { inline } from "./inline"

function parse(source: Source): dom.Inline[] | undefined {
	let result: dom.Inline[] | undefined
	if (source.readIf("$")) {
		result = [new dom.Inline.Math(source.till("$").readAll() || "", source.mark())]
		if (!source.readIf("$"))
			source.raise('Expected "$" as end of inline math.')
	}
	return result
}
inline.addParser(parse)
