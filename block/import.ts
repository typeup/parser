import { dom } from "@typeup/dom"
import { mendly } from "mendly"
import * as file from "../file.js"
import { Source } from "../Source.js"
import { block } from "./block.js"

function parse(source: Source): dom.Block[] | undefined {
	let result: dom.Block[] | undefined
	if (source.readIf("!import ")) {
		const path = source.till("\n").readAll()
		if (!path) source.raise("Expected URL to subdocument to import.", "recoverable")
		else if (!source.readIf("\n")) source.raise("Expected newline as end of import.", "recoverable")
		else {
			const region = source.mark()
			const importPath = mendly.Uri.parse(path + ".tup")
			if (!importPath) source.raise("Unable to parse imported path.", "recoverable")
			else {
				const s = source.open(importPath)
				const content = s instanceof Source ? file.parse(s) : s
				if (!content) source.raise("Unable to open imported file.", "recoverable")
				else result = [new dom.Block.Import(mendly.Uri.parse(path) || mendly.Uri.empty, content, region)]
			}
		}
	}
	return result
}
block.register(parse)
