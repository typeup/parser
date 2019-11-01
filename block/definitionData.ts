import * as dom from "@typeup/dom"
import { Source } from "../Source"
import * as inline from "../inline"

export function parse(source: Source): dom.block.DefinitionData[] | undefined {
	let result: dom.block.DefinitionData[] | undefined
	if (source.readIf(": ")) {
		while ((source.peek() || "").match(/\s/))
			source.read()
		result = [ new dom.block.DefinitionData(inline.parse(source.until("\n")) || [], source.mark()) ]
		const next = parse(source)
		if (next)
			result.push(...next)
	}
	return result
}
