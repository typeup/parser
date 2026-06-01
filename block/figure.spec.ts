import { mendly } from "mendly"
import { parser } from "../index.js"

describe("parser.block.figure", () => {
	it.each([
		{ label: "with image", input: "!figure https://example.com/image.png\nFigure caption." },
		{ label: "with classes", input: "!figure https://example.com/image.png class1 class2\nFigure caption." },
		{ label: "empty uri", input: "!figure \nEmpty caption below." },
		{ label: "missing newline", input: "!figure https://example.com/img.png" }
	])("$label", ({ input }) =>
		expect(
			(parser.block.parse(input, new mendly.Error.Handler.Console()) || []).map(node => node.dehydrate())
		).toMatchSnapshot())
})
