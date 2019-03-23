import * as dom from "@typeup/dom"
import { Source } from "../Source"
import * as inline from "../inline"
import * as block from "./block"

function parse(source: Source): dom.block.Block[] | undefined {
	let level = 0
	while (source.readIf("#"))
		level++
	let result: dom.block.Block[] | undefined
	if (level > 0) {
		while ((source.peek() || "").match(/\s/))
			source.read()
		result = [new dom.block.Heading(level, inline.parse(source.till("\n")) || [], source.mark())]
		if (!source.readIf("\n"))
			source.raise("Expected newline as end of heading.")
	}
	return result
}
block.addParser(parse)
