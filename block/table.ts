import { dom } from "@typeup/dom"
import { inline } from "../inline"
import { Source } from "../Source"
import { block } from "./block"

function parse(source: Source): dom.Block[] | undefined {
	const rows: dom.Block.Table.Row[] = []
	let row: dom.Block.Table.Row | undefined
	while (source.peekIs("| ") && (row = parseRow(true, source.till("\n"))) && source.readIf("\n"))
		rows.push(row)
	let alignments: ("" | "left" | "center" | "right")[] | undefined
	if (source.peekIs(["|-", "|:-"]) && source.readIf("|")) {
		const alignmentString = source.until("\n").readAll()
		if (alignmentString)
			alignments = alignmentString
				.substr(0, alignmentString.length - 2)
				.split("|")
				.map(a => (a.startsWith(":") ? (a.endsWith(":") ? "center" : "left") : a.endsWith(":") ? "right" : ""))
	}
	while (source.peekIs("| ") && (row = parseRow(false, source.till("\n"))) && source.readIf("\n"))
		rows.push(row)
	let result: dom.Block[] | undefined
	if (rows.length > 0) {
		const region = source.mark()
		result = block.parse(source) || []
		if (result.length > 0 && result[0] instanceof dom.Block.Paragraph)
			result[0] = new dom.Block.Table(alignments || [], rows, (result[0] as dom.Block.Paragraph).content, region)
		else
			result.unshift(new dom.Block.Table(alignments || [], rows, [], region))
	}
	return result
}
function parseRow(header: boolean, source: Source): dom.Block.Table.Row | undefined {
	let result: dom.Block.Table.Row | undefined
	const cells: dom.Block.Table.Cell[] = []
	if (source.readIf("| ")) {
		let cell: dom.Block.Table.Cell | undefined
		while ((cell = parseCell(header, source)))
			cells.push(cell)
		if (cells.length > 0)
			result = new dom.Block.Table.Row(cells, source.mark())
	}
	return result
}
function parseCell(header: boolean, source: Source): dom.Block.Table.Cell | undefined {
	const content = inline.parse(source.till("|"))
	source.readIf("|")
	return content != undefined ? new dom.Block.Table.Cell(header, content, source.mark()) : undefined
}
block.register(parse)
