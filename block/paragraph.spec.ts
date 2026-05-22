import { mendly } from "mendly"
import { parser } from "../index"

describe("parser.block.paragraph", () => {
	it("single paragraph", () =>
		expect(
			(parser.block.parse("This is a single paragraph.", new mendly.Error.Handler.Console()) || []).map(node =>
				node.toObject()
			)
		).toMatchSnapshot())
	it("empty line chains into next block", () =>
		expect((parser.block.parse("\n# Heading\n") || []).map(node => node.class)).toContain("block.heading"))
})

describe("parser.block.definitionList", () => {
	it.each([
		{
			label: "two terms and multiple definitions",
			input: "Term 1\n: Description 1\n: Description A\nTerm 2\n: Description 2\n"
		},
		{ label: "followed by heading", input: "Term 1\n: Description 1\n# Heading\n" },
		{ label: "leading whitespace in data", input: "Term\n:    one\n" },
		{ label: "empty data", input: "Term\n: " },
		{ label: "whitespace-only data", input: "Term\n:    \n" }
	])("$label", ({ input }) =>
		expect(
			parser.block.parse(input, new mendly.Error.Handler.Console())?.map(node => node.toObject())
		).toMatchSnapshot())
})
