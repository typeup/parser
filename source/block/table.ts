import * as dom from "@typeup/dom"
import { Source } from "../Source"
import * as inline from "../inline"
import * as block from "./block"

function parse(source: Source): dom.block.Block[] | undefined {
	const rows: dom.block.TableRow[] = []
	let row: dom.block.TableRow | undefined
	while (source.peekIs("| ") && (row = parseRow(true, source.till("\n"))) && source.readIf("\n"))
		rows.push(row)
	let alignments: ("" | "left" | "center" | "right")[] | undefined
	if (source.peekIs(["|-", "|:-"]) && source.readIf("|")) {
		const alignmentString = source.until("\n").readAll()
		if (alignmentString)
			alignments = alignmentString.substr(0, alignmentString.length - 2).split("|").map(a => a.startsWith(":") ? a.endsWith(":") ? "center" : "left" : a.endsWith(":") ? "right" : "")
	}
	while (source.peekIs("| ") && (row = parseRow(false, source.till("\n"))) && source.readIf("\n"))
		rows.push(row)
	let result: dom.block.Block[] | undefined
	if (rows.length > 0) {
		const region = source.mark()
		result = block.parse(source) || []
		if (result.length > 0 && result[0] instanceof dom.block.Paragraph)
			result[0] = new dom.block.Table(alignments || [], rows, (result[0] as dom.block.Paragraph).content, region)
		else
			result.unshift(new dom.block.Table(alignments || [], rows, [], region))
	}
	return result
}
function parseRow(header: boolean, source: Source): dom.block.TableRow | undefined {
	let result: dom.block.TableRow | undefined
	const cells: dom.block.TableCell[] = []
	if (source.readIf("| ")) {
		let cell: dom.block.TableCell | undefined
		while (cell = parseCell(header, source))
			cells.push(cell)
		if (cells.length > 0)
			result = new dom.block.TableRow(cells, source.mark())
	}
	return result
}
function parseCell(header: boolean, source: Source): dom.block.TableCell | undefined {
	const content = inline.parse(source.till("|"))
	source.readIf("|")
	return content != undefined ? new dom.block.TableCell(header, content, source.mark()) : undefined
}
block.addParser(parse)
