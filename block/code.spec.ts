import { Error, IO } from "@cogneco/mend"
import { Source } from "../Source"
import { parse } from "."

describe("block.diagram", () => {
	it("simple", () => {
		const result = parse(new Source(IO.StringReader.create("%%\ncode block\n%%\nFigure Caption."), new Error.ConsoleHandler())) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})
