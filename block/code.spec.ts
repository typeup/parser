import { mendly } from "mendly"
import { parser } from "../index.js"

describe("parser.block.code", () => {
	it.each([
		{ label: "code block with caption", input: "%%\ncode block\n%%\nFigure Caption." },
		{
			label: "html",
			input: "%% html\n<html>\n<head>\n<title>Title</title>\n</head>\n<body>\n</body>\n</html>\n%%\ncode Caption."
		}
	])("$label", ({ input }) =>
		expect(
			(parser.block.parse(mendly.Reader.String.create(input), new mendly.Error.Handler.Console()) || []).map(node =>
				node.toObject()
			)
		).toMatchSnapshot())
	it.each([
		{ label: "without caption", input: "%%\nlet x = 1\n%%\n" },
		{ label: "empty body", input: "%%%%\n" },
		{ label: "missing newline", input: "%%lang" },
		{ label: "missing terminator", input: "%%ts\ncode" }
	])("$label", ({ input }) =>
		expect((parser.block.parse(input, new mendly.Error.Handler.Console()) || []).map(node => node.class)).toContain(
			"block.code"
		))
})
