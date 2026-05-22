import { mendly } from "mendly"
import { parser } from "../index"

describe("parser.block.assignment", () => {
	it.each([
		{ label: "simple", input: "variable = value\n" },
		{ label: "hyphen and underscore in name", input: "variable-name_2 = value\n" },
		{ label: "empty value", input: "variable = \n" },
		{ label: "nested variable", input: "design.icon = url\n" },
		{ label: "array style variable", input: "keywords[] = test\n" }
	])("$label", ({ input }) => expect((parser.block.parse(input) || []).map(node => node.toObject())).toMatchSnapshot())
})
