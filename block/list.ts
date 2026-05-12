import { dom } from "@typeup/dom"
import { Source } from "../Source"
import { block } from "./block"

function normalizeItems(items: dom.Block.List.Item[]): dom.Block.List.Item[] {
	const unwrapped = items.map(item => {
		return item.content[0] && item.content.length === 1 && item.content[0].class === "block.paragraph"
			? new dom.Block.List.Item((item.content[0] as any).content, item.region)
			: item
	})
	return unwrapped.some(item => item.content.some(content => !content.class.startsWith("inline.")))
		? unwrapped.map(item =>
				item.content.every(content => content.class.startsWith("inline."))
					? new dom.Block.List.Item([new dom.Block.Paragraph(item.content as dom.Inline[])], item.region)
					: item
			)
		: unwrapped
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
			next[0] = new ListClass(normalizeItems(items))
			result = next
		} else result = [new ListClass(normalizeItems(items)) as dom.Block, ...(next || [])]
	}
	return result
}

block.register(parse)
