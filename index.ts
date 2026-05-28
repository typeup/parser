import { dom } from "@typeup/dom"
import { mendly } from "mendly"
import { block as _block } from "./block/index.js"
import { Importer as _Importer } from "./Importer.js"
import { inline as _inline } from "./inline/index.js"
import { Source } from "./Source.js"

export namespace parser {
	export function parse(
		reader: string | undefined,
		handler?: mendly.Error.Handler,
		importer?: Importer
	): dom.Document | undefined
	export function parse(
		reader: mendly.Reader | undefined,
		handler?: mendly.Error.Handler,
		importer?: Importer
	): dom.Document | undefined
	export function parse(
		reader: mendly.Reader | string | undefined,
		handler?: mendly.Error.Handler,
		importer?: Importer
	): dom.Document | undefined {
		const source = reader instanceof Source ? reader : Source.from(reader, handler, importer)
		return source && new dom.Document(block.parse(source) || [], source.mark())
	}
	export function open(
		path: mendly.Uri | string | undefined,
		handler?: mendly.Error.Handler,
		importer?: Importer
	): dom.Document | undefined {
		const locator = typeof path == "string" ? mendly.Uri.parse(path) : path
		return locator && parse(Source.from(mendly.Reader.open(locator), handler, importer), handler, importer)
	}
	export type Importer = _Importer
	export namespace inline {
		export const parse = _inline.parse
	}
	export namespace block {
		export const parse = _block.parse
	}
}
