import { mendly } from "mendly"
import { parser } from "../index"

describe("parser.inline.link", () => {
	it.each([
		{ name: "basic", input: "[./destination link]" },
		{ name: "in text", input: "This is a text with an [./destination link] in it." },
		{ name: "single flag", input: "[./destination|blank link]" },
		{ name: "multiple flags", input: "[./destination|blank|download link]" },
		{ name: "flag without display text", input: "[./destination|blank]" },
		{ name: "unknown flag", input: "[./destination|unknown link]" },
		{ name: "unknown and known flag", input: "[./destination|unknown|blank link]" },
		{ name: "empty flag", input: "[./destination| link]" },
		{ name: "empty then valid flag", input: "[./destination||blank link]" },
		{ name: "empty then valid flag without display text", input: "[./destination||blank]" }
	])("$name", ({ input }) => expect(parser.inline.parse(input)?.map(node => node.toObject())).toMatchSnapshot())

	it("target without display text parses", () => {
		expect((parser.inline.parse("[target]") || []).map(node => node.class)).toContain("inline.link")
	})

	it("target with empty display segment parses", () => {
		expect((parser.inline.parse("[target ]") || []).map(node => node.class)).toContain("inline.link")
	})

	it("unclosed link still yields inline link", () => {
		expect(
			(parser.inline.parse("[target", new mendly.Error.Handler.Console()) || []).map(node => node.class)
		).toContain("inline.link")
	})

	it("empty target still yields inline link", () => {
		expect((parser.inline.parse("[]", new mendly.Error.Handler.Console()) || []).map(node => node.class)).toContain(
			"inline.link"
		)
	})
})
