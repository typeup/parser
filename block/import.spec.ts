import { mendly } from "mendly"
import { Source } from "../Source"
import { block } from "."

describe("parser.block.import", () => {
	it("simple", () => {
		const result =
			block.parse(
				new Source(mendly.Reader.String.create("!import ./example/subdocument\n"), new mendly.Error.Handler.Console())
			) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})
