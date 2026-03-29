import { dom } from "@typeup/dom"
import { mendly } from "mendly"
import { block } from "./block"
import { CommentStripper } from "./CommentStripper"
import { Source } from "./Source"

export namespace parser {
	export function parse(reader: string | undefined, handler?: mendly.Error.Handler): dom.Document | undefined
	export function parse(reader: mendly.Reader | undefined, handler?: mendly.Error.Handler): dom.Document | undefined
	export function parse(
		reader: mendly.Reader | string | undefined,
		handler: mendly.Error.Handler = new mendly.Error.Handler.Console()
	): dom.Document | undefined {
		let result: dom.Document | undefined
		if (reader) {
			if (typeof reader == "string")
				reader = mendly.Reader.String.create(reader)
			const source = new Source(new CommentStripper(reader), handler)
			result = new dom.Document(block.parseAll(source) || [], source.mark())
		}
		return result
	}
	export function open(
		path: string | undefined,
		handler: mendly.Error.Handler = new mendly.Error.Handler.Console()
	): dom.Document | undefined {
		const locator = mendly.Uri.parse(path)
		return locator ? parse(mendly.Reader.open(locator), handler) : undefined
	}
}
