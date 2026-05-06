import { mendly } from "mendly"
import { parser } from "../index"

describe("parser.block.quote", () => {
	it.each([
		{ label: "simple", input: '"""\nTo be or not to be.\n"""' },
		{ label: "with cite", input: '"""\nTo be or not to be.\n""" https://example.com' },
		{ label: "with attribution", input: '"""\nTo be or not to be.\n"""\nWilliam Shakespeare' },
		{
			label: "with cite and attribution",
			input: '"""\nTo be or not to be.\n""" https://example.com\nWilliam Shakespeare'
		},
		{ label: "multiple inner blocks", input: '"""\nFirst paragraph.\n\nSecond paragraph.\n"""' }
	])("$label", ({ input }) => {
		const result = parser.block.parse(input, new mendly.Error.Handler.Console()) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})
