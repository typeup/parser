import { dom } from "@typeup/dom"
import { mendly } from "mendly"
import { block as _block } from "./block"
import { inline as _inline } from "./inline"
import { Source as _Source } from "./Source"

export namespace parser {
	export function parse(reader: string | undefined, handler?: mendly.Error.Handler): dom.Document | undefined
	export function parse(reader: mendly.Reader | undefined, handler?: mendly.Error.Handler): dom.Document | undefined
	export function parse(source: Source | undefined): dom.Document | undefined
	export function parse(
		reader: mendly.Reader | Source | string | undefined,
		handler?: mendly.Error.Handler
	): dom.Document | undefined {
		const source = reader instanceof Source ? reader : Source.from(reader, handler)
		return source && new dom.Document(block.parse(source) || [], source.mark())
	}
	export function open(
		path: mendly.Uri | string | undefined,
		handler?: mendly.Error.Handler
	): dom.Document | undefined {
		const locator = typeof path == "string" ? mendly.Uri.parse(path) : path
		return locator && parse(Source.from(mendly.Reader.open(locator), handler))
	}
	export import Source = _Source
	export namespace inline {
		export const parse = _inline.parse
	}
	export namespace block {
		export const parse = _block.parse
	}
}
