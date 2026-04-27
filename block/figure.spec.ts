import { mendly } from "mendly"
import { parser } from "../index"

describe("parser.block.figure", () => {
	it.each([
		["!figure https://example.com/image.png\nFigure caption.", "with-image"],
		["!figure https://example.com/image.png class1 class2\nFigure caption.", "with-classes"],
		["!figure \nEmpty caption below.", "empty-uri"]
	])("%s - %s", input => {
		const result = parser.block.parse(input, new mendly.Error.Handler.Console()) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})
