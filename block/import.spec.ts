import { Error, IO } from "@cogneco/mend"
import { Source } from "../Source"
import { parse } from "."

describe("block.import", () => {
	it("simple", () => {
		const result = parse(new Source(IO.StringReader.create("!import ./example/subdocument\n"), new Error.ConsoleHandler())) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})
