import { Error, IO } from "@cogneco/mend"
import { Source } from "../Source"
import { parse } from "."

describe("inline.code", () => {
	it("basic", () => {
		const result = parse(new Source(IO.StringReader.create("%inline code%"), new Error.ConsoleHandler())) || []
		expect(result.map(node => node.toObject())).toEqual([ { class: "Inline.Code", value: "inline code" } ])
	})
	it("in text", () => {
		const result = parse(new Source(IO.StringReader.create("This is a text with an %inline code% in it."), new Error.ConsoleHandler())) || []
		expect(result.map(node => node.toObject())).toEqual([
			{ class: "Inline.Text", value: "This is a text with an " },
			{ class: "Inline.Code", value: "inline code" },
			{ class: "Inline.Text", value: " in it." },
		])
	})
})
