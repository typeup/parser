import { mendly } from "mendly"
import { parser } from "../index"

describe("parser.inline.link", () => {
	it("basic", () => {
		const result = parser.inline.parse("[./destination link]", new mendly.Error.Handler.Console()) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
	it("in text", () => {
		const result =
			parser.inline.parse("This is a text with an [./destination link] in it.", new mendly.Error.Handler.Console())
			|| []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})
