import { dom } from "@typeup/dom"
import { mendly } from "mendly"
import { Source } from "../Source.js"
import "./code.js"
import "./emphasize.js"
import "./link.js"
import "./math.js"
import "./quote.js"
import "./text.js"
import { inline as _inline } from "./inline.js"

export namespace inline {
	export function parse(
		reader: mendly.Reader | string | undefined,
		handler?: mendly.Error.Handler
	): dom.Inline[] | undefined {
		const source = Source.from(reader, handler)
		return source && _inline.parse(source)
	}
}
