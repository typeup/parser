import { mendly } from "mendly"
import { parser } from "../index.js"

describe("parser.inline.emphasize", () => {
	it.each([
		{ label: "standalone emphasize", input: "_emphasize_" },
		{ label: "in text", input: "This is a text with an _emphasize_ in it." }
	])("$label", ({ input }) =>
		expect(
			(parser.inline.parse(input, new mendly.Error.Handler.Console()) || []).map(node => node.toObject())
		).toMatchSnapshot())
	it.each([
		{ label: "unclosed delimiter", input: "_unclosed" },
		{ label: "empty delimiters", input: "__" }
	])("$label", ({ input }) =>
		expect((parser.inline.parse(input, new mendly.Error.Handler.Console()) || []).map(node => node.class)).toContain(
			"inline.emphasize"
		))
})
