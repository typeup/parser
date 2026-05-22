import { dom } from "@typeup/dom"
import { parser } from "../index"

describe("parser.block.list", () => {
	describe.each([
		{ kind: "ordered", marker: "1." },
		{ kind: "unordered", marker: "-" }
	])("$kind", ({ marker }) => {
		it.each([
			{ label: "single item", render: (symbol: string) => `${symbol} First item` },
			{ label: "multiple items", render: (symbol: string) => `${symbol} First\n${symbol} Second\n${symbol} Third` },
			{ label: "nested list", render: (symbol: string) => `${symbol} Outer\n\t${symbol} Inner` },
			{
				label: "mixed item density",
				render: (symbol: string) => `${symbol} First\n${symbol} Second\n\t${symbol} Nested`
			},
			{ label: "followed by paragraph", render: (symbol: string) => `${symbol} Item\nA paragraph` },
			{ label: "empty line between items", render: (symbol: string) => `${symbol} First\n\n${symbol} Second` }
		])("$label", ({ render }) =>
			expect(parser.block.parse(render(marker))?.map(node => node.toObject())).toMatchSnapshot())
	})
	it("normalizes mixed inline and nested items", () => {
		const parsed = parser.block.parse("- Parent\n\t- Child\n- Plain\n") || []
		expect(parsed[0]).toBeInstanceOf(dom.Block.List.Unordered)
		expect(parsed[0]?.class).toBe("block.list.unordered")
	})
	it("handles indented-only items and merge with empty lines", () => {
		const input = "-\n\t- child\n\n-\n\tvalue\n"
		expect((parser.block.parse(input) || []).map(node => node.class)).toContain("block.list.unordered")
	})
	it("handles double-indented continuation content", () => {
		const input = "-\n\t\tinner\n-\n\t\tsecond\n"
		expect((parser.block.parse(input) || []).map(node => node.class)).toContain("block.list.unordered")
	})
	it("parses minimal list at end of input", () => {
		expect((parser.block.parse("-") || []).map(node => node.class)).toContain("block.list.unordered")
	})
	it("parses list marker followed by eof after whitespace", () => {
		expect((parser.block.parse("- ") || []).map(node => node.class)).toContain("block.list.unordered")
	})
	it("merges with following same-class list after empty lines", () => {
		const parsed = parser.block.parse("- first\n\n- second\n") || []
		expect(parsed[0]).toBeInstanceOf(dom.Block.List.Unordered)
		expect(parsed[0]?.class).toBe("block.list.unordered")
	})
	it("wraps inline-only items when mixed with block content", () => {
		const parsed = parser.block.parse("- one\n-\n\t# heading\n") || []
		expect(parsed[0]?.class).toBe("block.list.unordered")
	})
	it("keeps non-inline continuation inside merged list item", () => {
		const parsed = parser.block.parse("-\n- seed\n\t# heading\n") || []
		expect(parsed[0]).toBeInstanceOf(dom.Block.List.Unordered)
		const list = parsed[0] as dom.Block.List.Unordered
		expect(list.content).toHaveLength(2)
		expect(parsed[1]?.class).toBe("block.paragraph")
	})
	it("keeps block-only list items sparse", () => {
		const parsed = parser.block.parse("-\n\t# first\n\n-\n\t# second\n") || []
		expect(parsed[0]).toBeInstanceOf(dom.Block.List.Unordered)
		expect(parsed[0]?.class).toBe("block.list.unordered")
	})
})
