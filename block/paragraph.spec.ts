import { mendly } from "mendly"
import { parser } from "../index"

describe("parser.block.paragraph", () => {
	it("simple", () => {
		const result = parser.block.parse("This is a single paragraph.", new mendly.Error.Handler.Console()) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})

describe("parser.block.definitionList", () => {
	it("simple", () => {
		const result =
			parser.block.parse(
				"Term 1\n: Description 1\n: Description A\nTerm 2\n: Description 2\n",
				new mendly.Error.Handler.Console()
			) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})
