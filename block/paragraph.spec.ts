import { mendly } from "mendly"
import { parser } from "../index"

describe("parser.block.paragraph", () => {
	it("simple", () => {
		const result = parser.block.parse("This is a single paragraph.", new mendly.Error.Handler.Console()) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})

describe("parser.block.definitionList", () => {
	it.each([
		{ label: "simple", input: "Term 1\n: Description 1\n: Description A\nTerm 2\n: Description 2\n" },
		{ label: "followed by heading", input: "Term 1\n: Description 1\n# Heading\n" }
	])("$label", ({ input }) =>
		expect(parser.block.parse(input, new mendly.Error.Handler.Console())?.map(node => node.toObject())).toMatchSnapshot()
	)
})
