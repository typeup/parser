import { dom } from "@typeup/dom"
import { mendly } from "mendly"
import { Source } from "../Source"
import "./code"
import "./emphasize"
import "./link"
import "./math"
import "./quote"
import "./text"
import { inline as _inline } from "./inline"

export namespace inline {
	export function parse(
		reader: mendly.Reader | string | undefined,
		handler?: mendly.Error.Handler
	): dom.Inline[] | undefined {
		const source = Source.from(reader, handler)
		return source && _inline.parse(source)
	}
}
