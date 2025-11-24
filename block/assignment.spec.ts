import { mendly } from "mendly"
import { Source } from "../Source"
import { block } from "."

describe("parser.block.assignment", () => {
	it("simple", () => {
		const result =
			block.parse(new Source(mendly.Reader.String.create("variable = value\n"), new mendly.Error.Handler.Console())) ||
			[]
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})
