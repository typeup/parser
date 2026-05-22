import { dom } from "@typeup/dom"
import { Source } from "../Source"
import { block } from "./block"

function makeDense(content: dom.Block.List.Item.Content[]): dom.Inline[] {
	return content.map(c => (c.is("block.paragraph") ? c.content : c.is("inline") ? c : undefined)).filter((c): c is dom.Inline => c != undefined)
}
function makeSparse(content: dom.Block.List.Item.Content[]): dom.Block[] {
	return content.length > 0 && content.every(c => c.is("inline"))
		? [new dom.Block.Paragraph(content as dom.Inline[])]
		: content
}
function normalize(items: dom.Block.List.Item[]): dom.Block.List.Item[] {
	const mapping = items.some(
		item =>
			item.content.length > 0
			&& item.content.every(content => content.is("inline"))
			|| (item.content.length == 1 && item.content[0]?.is("block.paragraph"))
	)
		? makeDense
		: makeSparse
		return items.map(item => new dom.Block.List.Item(mapping(item.content), item.region))
}
function parse(source: Source): dom.Block[] | undefined {
	let peeked = ""
	let p: string | undefined
	while ((p = source.peekIs(peeked + "\t"))) peeked = p
	let result: dom.Block[] | undefined
	const symbol = source.readIfAny(peeked + "1.", peeked + "-")
	if (symbol) {
		while ((source.peek() || "").match(/\s/)) source.read()
		const next = block.parse(source)
		let items: dom.Block.List.Item[] = [
			new dom.Block.List.Item(block.parseAll(source.requirePrefix("\t")) || [], source.mark())
		]
		let index = 0
		while (next && next.length > 0 && next[index] instanceof dom.Block.EmptyLine) index++
		const ListClass: typeof dom.Block.List.Ordered | typeof dom.Block.List.Unordered = symbol.endsWith("-")
			? dom.Block.List.Unordered
			: dom.Block.List.Ordered
		if (next && next.length > 0 && next[index] instanceof ListClass) {
			items = items.concat((next[index] as dom.Block.List.Ordered | dom.Block.List.Unordered).content)
			while (index-- > 0) next.shift()
			next[0] = new ListClass(normalize(items))
			result = next
		} else result = [new ListClass(normalize(items)) as dom.Block, ...(next || [])]
	}
	return result
}

block.register(parse)
