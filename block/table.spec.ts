import { mendly } from "mendly"
import { parser } from "../index"

describe("parser.block.table", () => {
	it("simple", () => {
		const result =
			parser.block.parse(
				"| Header A | Header B |\n|----------|----------|\n| value A  | value B  |\nTable Caption.",
				new mendly.Error.Handler.Console()
			) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
	it("complex", () => {
		const result =
			parser.block.parse(
				`
| Property          |   | Description                       |
|-------------------|---|-----------------------------------|
| name              | r | Name of the site.                 |
| url               | r | URL of the site.                  |
| terms             | o | The terms and conditions.         |
A selection of relevant properties required for creating new merchants. (r - required, o - optional)
`,
				new mendly.Error.Handler.Console()
			) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})
