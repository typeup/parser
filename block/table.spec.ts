import { mendly } from "mendly"
import { Source } from "../Source"
import { block } from "."

describe("parser.block.table", () => {
	it("simple", () => {
		const result =
			block.parse(
				new Source(
					mendly.Reader.String.create(
						"| Header A | Header B |\n|----------|----------|\n| value A  | value B  |\nTable Caption."
					),
					new mendly.Error.Handler.Console()
				)
			) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
	it("complex", () => {
		const result =
			block.parse(
				new Source(
					mendly.Reader.String.create(`
| Property          |   | Description                       |
|-------------------|---|-----------------------------------|
| name              | r | Name of the site.                 |
| url               | r | URL of the site.                  |
| terms             | o | The terms and conditions.         |
A selection of relevant properties required for creating new merchants. (r - required, o - optional)
		`),
					new mendly.Error.Handler.Console()
				)
			) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})
