import { Error, IO } from "@cogneco/mend"
import { Source } from "../Source"
import { parse } from "."

describe("block.paragraph", () => {
	it("simple", () => {
		const result = parse(new Source(IO.StringReader.create("This is a single paragraph."), new Error.ConsoleHandler())) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})

describe("block.definitionList", () => {
	it("simple", () => {
		const result = parse(new Source(IO.StringReader.create("Term 1\n: Description 1\n: Description A\nTerm 2\n: Description 2\n"), new Error.ConsoleHandler())) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})
