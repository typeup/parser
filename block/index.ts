import { dom } from "@typeup/dom"
import { mendly } from "mendly"
import { Source } from "../Source"
import "./assignment"
import "./chapter"
import "./code"
import "./diagram"
import "./emptyLine"
import "./figure"
import "./frame"
import "./heading"
import "./import"
import "./index"
import "./list"
import "./math"
import "./paragraph"
import "./quote"
import "./section"
import "./table"
import "./video"
import { block as _block } from "./block"

export namespace block {
	export function parse(
		reader: mendly.Reader | string | Source | undefined,
		handler?: mendly.Error.Handler
	): dom.Block[] | undefined {
		const source = reader instanceof Source ? reader : Source.from(reader, handler)
		return source && _block.parseAll(source)
	}
}
