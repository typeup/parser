import { dom } from "@typeup/dom"
import { Source } from "../Source"
import { inline } from "./inline"

function parse(source: Source): dom.Inline[] | undefined {
	let result: dom.Inline[] | undefined
	if (source.readIf("[")) {
		const target = source.till([" ", "]"]).readAll() || ""
		result = [
			new dom.Inline.Link(
				target,
				source.readIf(" ")
					? inline.parse(source.till("]")) || []
					: [new dom.Inline.Text(target, source.mark()) as dom.Inline],
				source.mark()
			),
		]
		if (!source.readIf("]"))
			source.raise('Expected "]" as end of link.')
	}
	return result
}
inline.addParser(parse)
