import { mendly } from "mendly"
import { parser } from "../index"

describe("parser.inline.emphasize", () => {
	it("basic", () => {
		const result = parser.inline.parse("_emphasize_", new mendly.Error.Handler.Console()) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
	it("in text", () => {
		const result =
			parser.inline.parse("This is a text with an _emphasize_ in it.", new mendly.Error.Handler.Console()) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})
