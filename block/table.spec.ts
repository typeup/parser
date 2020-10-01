import { Error, IO } from "@cogneco/mend"
import { Source } from "../Source"
import { parse } from "."

describe("block.table", () => {
	it("simple", () => {
		const result = parse(new Source(IO.StringReader.create("| Header A | Header B |\n|----------|----------|\n| value A  | value B  |\nTable Caption."), new Error.ConsoleHandler())) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
	it("complex", () => {
		const result = parse(new Source(IO.StringReader.create(`
| Property          |   | Description                       |
|-------------------|---|-----------------------------------|
| name              | r | Name of the site.                 |
| url               | r | URL of the site.                  |
| terms             | o | The terms and conditions.         |
A selection of relevant properties required for creating new merchants. (r - required, o - optional)
		`), new Error.ConsoleHandler())) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})
