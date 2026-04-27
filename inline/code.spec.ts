import { mendly } from "mendly"
import { parser } from "../index"

describe("parser.inline.code", () => {
	it("basic", () => {
		const result = parser.inline.parse("%inline code%", new mendly.Error.Handler.Console()) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
	it("in text", () => {
		const result =
			parser.inline.parse("This is a text with an %inline code% in it.", new mendly.Error.Handler.Console()) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
	it("html in text", () => {
		const result =
			parser.inline.parse("This is a text with an %<html></html>% in it.", new mendly.Error.Handler.Console()) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})
