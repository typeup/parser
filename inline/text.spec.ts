import { Error, IO } from "@cogneco/mend"
import { Source } from "../Source"
import { parse } from "."

describe("inline.text", () => {
	it("basic", () => {
		const result = parse(new Source(IO.StringReader.create("A simple text."), new Error.ConsoleHandler())) || []
		expect(result.map(node => node.toObject())).toEqual([{ class: "Inline.Text", value: "A simple text." }])
	})
})
