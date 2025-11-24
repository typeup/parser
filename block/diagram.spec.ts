import { mendly } from "mendly"
import { Source } from "../Source"
import { block } from "."

describe("parser.block.diagram", () => {
	it("simple", () => {
		const result =
			block.parse(
				new Source(
					mendly.Reader.String.create("++\n<svg></svg>++\nFigure Caption."),
					new mendly.Error.Handler.Console()
				)
			) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})
