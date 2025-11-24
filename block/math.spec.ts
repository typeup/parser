import { mendly } from "mendly"
import { Source } from "../Source"
import { block } from "."

describe("parser.block.math", () => {
	it("simple", () => {
		const result =
			block.parse(
				new Source(
					mendly.Reader.String.create("$$\na^2 + b^2 = c^2$$\nMath Caption."),
					new mendly.Error.Handler.Console()
				)
			) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})
