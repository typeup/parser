import { mendly } from "mendly"
import { Source } from "../Source"
import { block } from "."

describe("parser.block.paragraph", () => {
	it("simple", () => {
		const result =
			block.parse(
				new Source(mendly.Reader.String.create("This is a single paragraph."), new mendly.Error.Handler.Console())
			) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})

describe("parser.block.definitionList", () => {
	it("simple", () => {
		const result =
			block.parse(
				new Source(
					mendly.Reader.String.create("Term 1\n: Description 1\n: Description A\nTerm 2\n: Description 2\n"),
					new mendly.Error.Handler.Console()
				)
			) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})
