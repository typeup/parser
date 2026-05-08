import { parser } from "../index"

describe("parser.block.orderedList", () => {
	it.each([
		{ label: "single item", input: "1. First item" },
		{ label: "multiple items", input: "1. First\n1. Second\n1. Third" },
		{ label: "nested list", input: "1. Outer\n\t1. Inner" },
		{ label: "followed by paragraph", input: "1. Item\nA paragraph" },
		{ label: "empty line between items", input: "1. First\n\n1. Second" }
	])("$label", ({ input }) => expect(parser.block.parse(input)?.map(node => node.toObject())).toMatchSnapshot())
})
