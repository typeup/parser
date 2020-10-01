import { Error, IO } from "@cogneco/mend"
import { Source } from "../Source"
import { parse } from "."

describe("inline.empasize", () => {
	it("basic", () => {
		const result = parse(new Source(IO.StringReader.create("_emphasize_"), new Error.ConsoleHandler())) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
	it("in text", () => {
		const result = parse(new Source(IO.StringReader.create("This is a text with an _empasize_ in it."), new Error.ConsoleHandler())) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})
