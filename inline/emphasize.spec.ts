import { mendly } from "mendly"
import { Source } from "../Source"
import { inline } from "."

describe("parser.inline.emphasize", () => {
	it("basic", () => {
		const result =
			inline.parse(new Source(mendly.Reader.String.create("_emphasize_"), new mendly.Error.Handler.Console())) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
	it("in text", () => {
		const result =
			inline.parse(
				new Source(
					mendly.Reader.String.create("This is a text with an _emphasize_ in it."),
					new mendly.Error.Handler.Console()
				)
			) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})
