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
})
