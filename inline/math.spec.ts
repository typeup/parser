import { mendly } from "mendly"
import { parser } from "../index.js"

describe("parser.inline.math", () => {
	it.each([
		{ label: "standalone inline math", input: "$a^2 + b^2 = c^2$" },
		{ label: "in text", input: "This is a text with an $a^2 + b^2 = c^2$ in it." }
	])("$label", ({ input }) =>
		expect(
			(parser.inline.parse(input, new mendly.Error.Handler.Console()) || []).map(node => node.dehydrate())
		).toMatchSnapshot())
	it.each([
		{ label: "unclosed delimiter", input: "$unclosed" },
		{ label: "empty delimiters", input: "$$" }
	])("$label", ({ input }) =>
		expect((parser.inline.parse(input, new mendly.Error.Handler.Console()) || []).map(node => node.class)).toContain(
			"inline.math"
		))
})
