import { mendly } from "mendly"
import { parser } from "../index"

describe("parser.block.math", () => {
	it("simple", () => {
		const result = parser.block.parse("$$\na^2 + b^2 = c^2$$\nMath Caption.", new mendly.Error.Handler.Console()) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})
