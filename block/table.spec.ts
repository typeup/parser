import { mendly } from "mendly"
import { parser } from "../index.js"

describe("parser.block.table", () => {
	it.each([
		{
			label: "single row and caption",
			input: "| Header A | Header B |\n|----------|----------|\n| value A  | value B  |\nTable Caption."
		},
		{
			label: "complex",
			input: `
| Property          |   | Description                       |
|-------------------|---|-----------------------------------|
| name              | r | Name of the site.                 |
| url               | r | URL of the site.                  |
| terms             | o | The terms and conditions.         |
A selection of relevant properties required for creating new merchants. (r - required, o - optional)
`
		}
	])("$label", ({ input }) =>
		expect(
			(parser.block.parse(input, new mendly.Error.Handler.Console()) || []).map(node => node.dehydrate())
		).toMatchSnapshot())
	it.each([
		"| A | B |\n|---:|:---:|\n| 1 | 2 |\n",
		"| A |\n|--|\n|  |\n",
		"| A | B |\n| \n",
		"| A |\n|-\n| 1 |\n",
		"| A |\n|--|\n| 1 |",
		"| A |\n|:\n| 1 |\n",
		"| A |\n|---|\n"
	])("parses %s", input => expect((parser.block.parse(input) || []).map(node => node.class)).toContain("block.table"))
})
