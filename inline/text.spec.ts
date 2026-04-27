import { mendly } from "mendly"
import { parser } from "../index"

describe("parser.inline.text", () => {
	it("basic", () => {
		const result = parser.inline.parse("A simple text.", new mendly.Error.Handler.Console()) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})
