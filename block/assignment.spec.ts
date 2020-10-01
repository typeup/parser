import { Error, IO } from "@cogneco/mend"
import { Source } from "../Source"
import { parse } from "."

describe("block.assignment", () => {
	it("simple", () => {
		const result = parse(new Source(IO.StringReader.create("variable = value\n"), new Error.ConsoleHandler())) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})
