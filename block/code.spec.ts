import { mendly } from "mendly"
import { parser } from "../index"

describe("parser.block.code", () => {
	it("simple", () => {
		const result =
			parser.block.parse(
				mendly.Reader.String.create("%%\ncode block\n%%\nFigure Caption."),
				new mendly.Error.Handler.Console()
			) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
	it("html", () => {
		const result =
			parser.block.parse(
				mendly.Reader.String.create(
					"%% html\n<html>\n<head>\n<title>Title</title>\n</head>\n<body>\n</body>\n</html>\n%%\ncode Caption."
				),
				new mendly.Error.Handler.Console()
			) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})
