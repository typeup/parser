import { dom } from "@typeup/dom"
import { mendly } from "mendly"
import { Source } from "../Source.js"
import "./assignment.js"
import "./chapter.js"
import "./code.js"
import "./diagram.js"
import "./emptyLine.js"
import "./figure.js"
import "./frame.js"
import "./heading.js"
import "./import.js"
import "./index.js"
import "./list.js"
import "./math.js"
import "./paragraph.js"
import "./quote.js"
import "./section.js"
import "./table.js"
import "./video.js"
import { block as _block } from "./block.js"

export namespace block {
	export function parse(
		reader: mendly.Reader | string | Source | undefined,
		handler?: mendly.Error.Handler
	): dom.Block[] | undefined {
		const source = reader instanceof Source ? reader : Source.from(reader, handler)
		return source && _block.parseAll(source)
	}
}
