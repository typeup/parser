import { dom } from "@typeup/dom"
import { mendly } from "mendly"
import { block as _block } from "./block"
import { inline as _inline } from "./inline"
import { Source } from "./Source"

export namespace parser {
	export function parse(reader: string | undefined, handler?: mendly.Error.Handler): dom.Document | undefined
	export function parse(reader: mendly.Reader | undefined, handler?: mendly.Error.Handler): dom.Document | undefined
	export function parse(
		reader: mendly.Reader | string | undefined,
		handler?: mendly.Error.Handler
	): dom.Document | undefined {
		const source = Source.from(reader, handler)
		return source && new dom.Document(block.parse(source) || [], source.mark())
	}
	export function open(path: string | undefined, handler?: mendly.Error.Handler): dom.Document | undefined {
		const locator = mendly.Uri.parse(path)
		return locator && parse(mendly.Reader.open(locator), handler)
	}
	export namespace inline {
		export const parse = _inline.parse
	}
	export namespace block {
		export const parse = _block.parse
	}
}
