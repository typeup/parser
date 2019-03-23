import { Error, IO, Uri } from "@cogneco/mend"
import * as dom from "@typeup/dom"
import { Source } from "./Source"
import { CommentStripper } from "./CommentStripper"
import * as block from "./block"

export function parse(reader: IO.Reader | undefined, handler: Error.Handler): dom.File | undefined {
	let result: dom.File | undefined
	if (reader) {
		const source = new Source(new CommentStripper(reader), handler)
		result = new dom.File(block.parseAll(source) || [], source.mark())
	}
	return result
}
export function open(path: Uri.Locator | undefined, handler: Error.Handler): dom.File | undefined {
	return path ? parse(IO.Reader.open(path), handler) : undefined
}
