import "./assignment"
import "./chapter"
import "./code"
import "./diagram"
import "./emptyLine"
import "./figure"
import "./heading"
import "./import"
import "./index"
import "./math"
import "./orderedList"
import "./paragraph"
import "./section"
import "./table"
import "./unorderedList"
import "./video"
import { block as _block } from "./block"

export namespace block {
	export const parse = _block.parse
	export const parseAll = _block.parseAll
}
