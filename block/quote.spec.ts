import { mendly } from "mendly"
import { parser } from "../index.js"

describe("parser.block.quote", () => {
	it.each([
		{ label: "single quoted paragraph", input: '"""\nTo be or not to be.\n"""' },
		{ label: "with cite", input: '"""\nTo be or not to be.\n""" https://example.com' },
		{ label: "with attribution", input: '"""\nTo be or not to be.\n"""\nWilliam Shakespeare' },
		{
			label: "with cite and attribution",
			input: '"""\nTo be or not to be.\n""" https://example.com\nWilliam Shakespeare'
		},
		{ label: "multiple inner blocks", input: '"""\nFirst paragraph.\n\nSecond paragraph.\n"""' },
		{ label: "without attribution and caption", input: '"""\ninside\n"""\n' },
		{ label: "empty content", input: '"""\n"""\n' },
		{ label: "empty cite", input: '"""\ninside\n""" \n' },
		{ label: "unclosed quote block", input: '"""\ninside' }
	])("$label", ({ input }) => expect(parser.block.parse(input)?.map(node => node.dehydrate())).toMatchSnapshot())
})
