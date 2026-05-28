import { mendly } from "mendly"
import { parser } from "../index.js"

describe("parser.block.diagram", () => {
	it("diagram block with caption", () =>
		expect(
			(parser.block.parse("++\n<svg></svg>++\nFigure Caption.", new mendly.Error.Handler.Console()) || []).map(node =>
				node.toObject()
			)
		).toMatchSnapshot())
	it.each(["++\nA -> B\n++\n", "++++\n", "++diagram"])("parses %s", input =>
		expect((parser.block.parse(input, new mendly.Error.Handler.Console()) || []).map(node => node.class)).toContain(
			"block.diagram"
		))
})
