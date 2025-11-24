import { mendly } from "mendly"
import { Source } from "../Source"
import { inline } from "."

describe("parser.inline.code", () => {
	it("basic", () => {
		const result =
			inline.parse(new Source(mendly.Reader.String.create("%inline code%"), new mendly.Error.Handler.Console())) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
	it("in text", () => {
		const result =
			inline.parse(
				new Source(
					mendly.Reader.String.create("This is a text with an %inline code% in it."),
					new mendly.Error.Handler.Console()
				)
			) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
	it("html in text", () => {
		const result =
			inline.parse(
				new Source(
					mendly.Reader.String.create("This is a text with an %<html></html>% in it."),
					new mendly.Error.Handler.Console()
				)
			) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})
