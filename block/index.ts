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
	export const parse = _block.parse
	export const parseAll = _block.parseAll
}
