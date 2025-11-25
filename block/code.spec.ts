import { mendly } from "mendly"
import { Source } from "../Source"
import { block } from "."

describe("parser.block.code", () => {
	it("simple", () => {
		const result =
			block.parse(
				new Source(
					mendly.Reader.String.create("%%\ncode block\n%%\nFigure Caption."),
					new mendly.Error.Handler.Console()
				)
			) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
	it("html", () => {
		const result =
			block.parse(
				new Source(
					mendly.Reader.String.create(
						"%% html\n<html>\n<head>\n<title>Title</title>\n</head>\n<body>\n</body>\n</html>\n%%\ncode Caption."
					),
					new mendly.Error.Handler.Console()
				)
			) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})
