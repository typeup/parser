import { mendly } from "mendly"
import { parser } from "../index"

describe("parser.block.assignment", () => {
	it("simple", () => {
		const result = parser.block.parse("variable = value\n", new mendly.Error.Handler.Console()) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})
