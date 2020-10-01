import { Error, IO } from "@cogneco/mend"
import { Source } from "../Source"
import { parse } from "."

describe("inline.link", () => {
	it("basic", () => {
		const result = parse(new Source(IO.StringReader.create("[./destination link]"), new Error.ConsoleHandler())) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
	it("in text", () => {
		const result = parse(new Source(IO.StringReader.create("This is a text with an [./destination link] in it."), new Error.ConsoleHandler())) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})
