import { mendly } from "mendly"
import { parser } from "../index"

describe("parser.inline.link", () => {
	it.each([
		{ name: "basic", input: "[./destination link]" },
		{ name: "in text", input: "This is a text with an [./destination link] in it." },
		{ name: "single flag", input: "[./destination|external link]" },
		{ name: "multiple flags", input: "[./destination|external|new-tab link]" },
		{ name: "flag without display text", input: "[./destination|external]" }
	])("$name", ({ input }) => expect(parser.inline.parse(input)?.map(node => node.toObject())).toMatchSnapshot())
})
