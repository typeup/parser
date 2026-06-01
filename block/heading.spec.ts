import { mendly } from "mendly"
import { parser } from "../index.js"

describe("parser.block.heading", () => {
	it.each([
		{ label: "level 1", input: "# Heading\n" },
		{ label: "level 2", input: "## Heading\n" },
		{ label: "level 3", input: "### Heading\n" },
		{ label: "level 4", input: "#### Heading\n" },
		{ label: "level 5", input: "##### Heading\n" },
		{ label: "level 6", input: "###### Heading\n" }
	])("$label", ({ input }) =>
		expect(
			(parser.block.parse(input, new mendly.Error.Handler.Console()) || []).map(node => node.dehydrate())
		).toMatchSnapshot())
	it.each([
		{ label: "leading whitespace", input: "#   spaced heading\n" },
		{ label: "missing newline", input: "#" }
	])("$label", ({ input }) =>
		expect((parser.block.parse(input, new mendly.Error.Handler.Console()) || []).map(node => node.class)).toContain(
			"block.heading"
		))
})
