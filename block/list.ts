import { dom } from "@typeup/dom"
import { Source } from "../Source"
import { block } from "./block"

function makeDense(content: dom.Block.List.Item.Content[]): dom.Inline[] {
	return content.flatMap(c => (c.is("block.paragraph") ? c.content : c.is("inline") ? [c] : []))
}
function makeSparse(content: dom.Block.List.Item.Content[]): dom.Block[] {
	return content.length > 0 && content.every(c => c.is("inline"))
		? [new dom.Block.Paragraph(content as dom.Inline[])]
		: content
}
function normalize(items: dom.Block.List.Item[]): dom.Block.List.Item[] {
	const mapping = items.some(
		item =>
			(item.content.length > 0 && item.content.every(content => content.is("inline")))
			|| (item.content.length == 1 && item.content[0]?.is("block.paragraph"))
	)
		? makeDense
		: makeSparse
	return items.map(item => new dom.Block.List.Item(mapping(item.content), item.region))
}
function parse(source: Source): dom.Block[] | undefined {
	let result: dom.Block[] | undefined
	const symbol = source.readIfAny("1. ", "- ")
	if (symbol) {
		const items: dom.Block.List.Item[] = []
		do {
			items.push(new dom.Block.List.Item(block.parseAll(source.requirePrefix("\t")) || [], source.mark()))
			while (source.readIf("\n"));
		} while (source.readIf(symbol))
		result = [new (symbol == "1. " ? dom.Block.List.Ordered : dom.Block.List.Unordered)(normalize(items))]
	}
	return result
}

block.register(parse)
