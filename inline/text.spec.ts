import { mendly } from "mendly"
import { Source } from "../Source"
import { inline } from "."

describe("parser.inline.text", () => {
	it("basic", () => {
		const result =
			inline.parse(new Source(mendly.Reader.String.create("A simple text."), new mendly.Error.Handler.Console())) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})
