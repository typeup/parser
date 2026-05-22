import { mendly } from "mendly"
import { parser } from "../index"

describe("parser.inline.text", () => {
	it("plain text", () =>
		expect(
			(parser.inline.parse("A simple text.", new mendly.Error.Handler.Console()) || []).map(node => node.toObject())
		).toMatchSnapshot())
	it.each(["\\_x", "plain"])("parses %s as text", input =>
		expect((parser.inline.parse(input) || [])[0]?.class).toBe("inline.text"))
})
