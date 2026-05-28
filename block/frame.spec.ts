import { mendly } from "mendly"
import { parser } from "../index.js"

describe("parser.block.frame", () => {
	it.each([
		{ label: "with source", input: "!frame https://example.com/page.html\nFrame caption." },
		{ label: "with classes", input: "!frame https://example.com/page.html classA classB\nFrame caption." },
		{ label: "missing newline", input: "!frame https://example.com/page" }
	])("$label", ({ input }) =>
		expect((parser.block.parse(input, new mendly.Error.Handler.Console()) || []).map(node => node.class)).toContain(
			"block.frame"
		))
	it("invalid uri does not create frame", () =>
		expect((parser.block.parse("!frame \nCaption\n") || []).map(node => node.class)).not.toContain("block.frame"))
})
