import { dom } from "@typeup/dom"
import { mendly } from "mendly"
import { block } from "./block"
import { Source } from "./Source"

export function parse(source: Source | undefined): dom.File | undefined {
	const content = source && block.parse(source)
	return source && content && new dom.File(content, source.mark())
}
export function open(path: mendly.Uri | undefined, handler?: mendly.Error.Handler): dom.File | undefined {
	return path ? parse(Source.from(mendly.Reader.open(path), handler)) : undefined
}
