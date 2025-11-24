import { mendly } from "mendly"
import { Source } from "../Source"
import { inline } from "."

describe("parser.inline.link", () => {
	it("basic", () => {
		const result =
			inline.parse(
				new Source(mendly.Reader.String.create("[./destination link]"), new mendly.Error.Handler.Console())
			) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
	it("in text", () => {
		const result =
			inline.parse(
				new Source(
					mendly.Reader.String.create("This is a text with an [./destination link] in it."),
					new mendly.Error.Handler.Console()
				)
			) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})
