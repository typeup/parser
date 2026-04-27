import { mendly } from "mendly"
import { parser } from "../index"

describe("parser.inline.math", () => {
	it("basic", () => {
		const result = parser.inline.parse("$a^2 + b^2 = c^2$", new mendly.Error.Handler.Console()) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
	it("in text", () => {
		const result =
			parser.inline.parse("This is a text with an $a^2 + b^2 = c^2$ in it.", new mendly.Error.Handler.Console()) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})
