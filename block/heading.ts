import { dom } from "@typeup/dom"
import { inline } from "../inline/index.js"
import { Source } from "../Source.js"
import { block } from "./block.js"

function parse(source: Source): dom.Block[] | undefined {
	let level = 0
	while (source.readIf("#")) level++
	let result: dom.Block[] | undefined
	if (level > 0) {
		while ((source.peek() || "").match(/\s/)) source.read()
		result = [new dom.Block.Heading(level, inline.parse(source.till("\n")) || [], source.mark())]
		if (!source.readIf("\n")) source.raise("Expected newline as end of heading.")
	}
	return result
}
block.register(parse)
