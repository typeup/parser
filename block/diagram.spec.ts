import { mendly } from "mendly"
import { parser } from "../index"

describe("parser.block.diagram", () => {
	it("simple", () => {
		const result = parser.block.parse("++\n<svg></svg>++\nFigure Caption.", new mendly.Error.Handler.Console()) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})
