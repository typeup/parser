import { dom } from "@typeup/dom"
import { mendly } from "mendly"
import { block } from "./block"
import { CommentStripper } from "./CommentStripper"
import { Source } from "./Source"

export function parse(reader: mendly.Reader | undefined, handler: mendly.Error.Handler): dom.File | undefined {
	let result: dom.File | undefined
	if (reader) {
		const source = new Source(new CommentStripper(reader), handler)
		result = new dom.File(block.parseAll(source) || [], source.mark())
	}
	return result
}
export function open(path: mendly.Uri | undefined, handler: mendly.Error.Handler): dom.File | undefined {
	return path ? parse(mendly.Reader.open(path), handler) : undefined
}
