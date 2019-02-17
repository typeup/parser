import { Error } from "@cogneco/mend"
import * as dom from "@typeup/dom"
import { Source } from "../Source"
import * as block from "./block"

function parse(source: Source): dom.block.Block[] | undefined {
	let result: dom.block.Block[] | undefined
	let i = 1
	let peeked: string | undefined
	while ((peeked = source.peek(i)) && peeked.charAt(i - 1).match(/[a-z]|[A-Z]|[0-9]|_|-/i))
		i++
	if ((peeked = source.peek(i + 2)) && peeked.slice(-3) == " = ") {
		const name = source.read(i - 1)
		if (!name)
			source.raise("Missing name of variable to assign to.", Error.Level.Recoverable)
		else {
			source.read(3) // consume " = "
			let value = ""
			while (source.peek() != "\n")
				value += source.read()
			source.read() // consume "\n"
			result = [new dom.block.Assignment(name, value, source.mark())]
		}
	}
	return result
}
block.addParser(parse)
