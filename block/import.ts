import { dom } from "@typeup/dom"
import { mendly } from "mendly"
import * as file from "../file"
import { Source } from "../Source"
import { block } from "./block"

function parse(source: Source): dom.Block[] | undefined {
	let result: dom.Block[] | undefined
	if (source.readIf("!import ")) {
		const path = source.till("\n").readAll()
		if (!path)
			source.raise("Expected URL to subdocument to import.", "recoverable")
		else if (!source.readIf("\n"))
			source.raise("Expected newline as end of import.", "recoverable")
		else {
			const region = source.mark()
			const importPath = mendly.Uri.parse(path + ".tup")
			if (!importPath)
				source.raise("Unable to parse imported path.", "recoverable")
			else {
				const currentPath = region.resource
				const location = importPath.resolve(currentPath)
				const content = file.open(location, source)
				if (!content)
					source.raise("Unable to open imported file.", "recoverable")
				else
					result = [new dom.Block.Import(mendly.Uri.parse(path) || mendly.Uri.empty, content, region)]
			}
		}
	}
	return result
}
block.register(parse)
