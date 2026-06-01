import { parser } from "../index.js"

describe("parser.block.section", () => {
	it.each([
		{ label: "single section with paragraph", input: "---\nSection paragraph\n" },
		{ label: "section followed by section", input: "---\nOne\n\n---\nTwo\n" },
		{ label: "section followed by chapter", input: "---\nSection body\n\n===\nChapter body\n" }
	])("$label", ({ input }) => expect((parser.block.parse(input) || []).map(node => node.dehydrate())).toMatchSnapshot())

	it("empty section marker parses", () => {
		expect((parser.block.parse("---\n") || []).map(node => node.class)).toContain("block.section")
	})
})
