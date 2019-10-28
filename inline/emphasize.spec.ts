import { Error, IO } from "@cogneco/mend"
import { Source } from "../Source"
import { parse } from "."

describe("inline.empasize", () => {
	it("basic", () => {
		const result = parse(new Source(IO.StringReader.create("_emphasize_"), new Error.ConsoleHandler())) || []
		expect(result.map(node => node.toObject())).toEqual([{ class: "Inline.Emphasize", content: [{ class: "Inline.Text", value: "emphasize" }] }])
	})
	it("in text", () => {
		const result = parse(new Source(IO.StringReader.create("This is a text with an _empasize_ in it."), new Error.ConsoleHandler())) || []
		expect(result.map(node => node.toObject())).toEqual([
			{ class: "Inline.Text", value: "This is a text with an " },
			{ class: "Inline.Emphasize", content: [{ class: "Inline.Text", value: "empasize" }] },
			{ class: "Inline.Text", value: " in it." },
		])
	})
})
