import { mendly } from "mendly"
import { Source } from "../Source"
import { inline } from "."

describe("parser.inline.math", () => {
	it("basic", () => {
		const result =
			inline.parse(new Source(mendly.Reader.String.create("$a^2 + b^2 = c^2$"), new mendly.Error.Handler.Console())) ||
			[]
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
	it("in text", () => {
		const result =
			inline.parse(
				new Source(
					mendly.Reader.String.create("This is a text with an $a^2 + b^2 = c^2$ in it."),
					new mendly.Error.Handler.Console()
				)
			) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})
