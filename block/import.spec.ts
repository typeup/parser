import { mendly } from "mendly/node"
import { parser } from "../index"

describe("parser.block.import", () => {
	it("simple", () => {
		const result = parser.block.parse("!import ./example/subdocument\n", new mendly.Error.Handler.Console()) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})
