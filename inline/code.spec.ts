import { mendly } from "mendly"
import { parser } from "../index"

describe("parser.inline.code", () => {
	it.each([
		{ label: "standalone inline code", input: "%inline code%" },
		{ label: "in text", input: "This is a text with an %inline code% in it." },
		{ label: "html in text", input: "This is a text with an %<html></html>% in it." }
	])("$label", ({ input }) =>
		expect(
			(parser.inline.parse(input, new mendly.Error.Handler.Console()) || []).map(node => node.toObject())
		).toMatchSnapshot())
	it.each([
		{ label: "unclosed delimiter", input: "%unclosed" },
		{ label: "empty delimiters", input: "%%" }
	])("$label", ({ input }) =>
		expect((parser.inline.parse(input, new mendly.Error.Handler.Console()) || []).map(node => node.class)).toContain(
			"inline.code"
		))
})
