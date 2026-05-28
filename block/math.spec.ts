import { mendly } from "mendly"
import { parser } from "../index.js"

describe("parser.block.math", () => {
	it("math block with caption", () =>
		expect(
			(parser.block.parse("$$\na^2 + b^2 = c^2$$\nMath Caption.", new mendly.Error.Handler.Console()) || []).map(node =>
				node.toObject()
			)
		).toMatchSnapshot())
	it.each(["$$\nx+y\n$$\n", "$$$$\n", "$$\nmath"])("parses %s", input =>
		expect((parser.block.parse(input, new mendly.Error.Handler.Console()) || []).map(node => node.class)).toContain(
			"block.math"
		))
})
