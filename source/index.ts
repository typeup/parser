import { Error, IO, Uri } from "@cogneco/mend"
import * as dom from "@typeup/dom"
import { Source } from "./Source"
import { CommentStripper } from "./CommentStripper"
import * as block from "./block"

export class Parser {
	constructor() {}
	parse(reader: IO.Reader | undefined, handler: Error.Handler): dom.Document | undefined {
		let result: dom.Document | undefined
		if (reader) {
			const source = new Source(new CommentStripper(reader), handler)
			result = new dom.Document(block.parseAll(source) || [], source.mark())
		}
		return result
	}
	open(path: string | undefined, handler: Error.Handler): dom.Document | undefined {
		const locator = Uri.Locator.parse(path)
		return locator ? this.parse(IO.Reader.open(locator), handler) : undefined
	}
}
