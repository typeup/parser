import { mendly } from "mendly"
import { parser } from "../index"

describe("parser.inline.quote", () => {
	it.each([
		{ name: "basic", input: '"quoted text"' },
		{ name: "in text", input: 'This is a text with a "quoted part" in it.' },
		{ name: "with inline content", input: '"_emphasized_ quote"' }
	])("$name", ({ input }) => expect(parser.inline.parse(input)?.map(node => node.toObject())).toMatchSnapshot())

	it("unclosed quote still yields inline quote", () => {
		expect(
			(parser.inline.parse('"unclosed', new mendly.Error.Handler.Console()) || []).map(node => node.class)
		).toContain("inline.quote")
	})

	it("empty quote delimiters parse", () => {
		expect((parser.inline.parse('""') || []).map(node => node.class)).toContain("inline.quote")
	})
})
