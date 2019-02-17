import { Error, Uri } from "@cogneco/mend"
import * as dom from "@typeup/dom"
import { Source } from "../Source"
import * as file from "../file"
import * as block from "./block"

function parse(source: Source): dom.block.Block[] | undefined {
	let result: dom.block.Block[] | undefined
	if (source.readIf("!import ")) {
		const path = source.till("\n").readAll()
		if (!path)
			source.raise("Expected URL to subdocument to import.", Error.Level.Recoverable)
		else if (!source.readIf("\n"))
			source.raise("Expected newline as end of import.", Error.Level.Recoverable)
		else {
			const region = source.mark()
			const importPath = Uri.Locator.parse(path + ".tup")
			if (!importPath)
				source.raise("Unable to parse imported path.", Error.Level.Recoverable)
			else {
				const currentPath = region.resource
				const location = importPath.resolve(currentPath)
				const content = file.open(location, source)
				if (!content)
					source.raise("Unable to open imported file.", Error.Level.Recoverable)
				else
					result = [ new dom.block.Import(Uri.Locator.parse(path), content, region) ]
			}
		}
	}
	return result
}
block.addParser(parse)
