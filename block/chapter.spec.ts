import { parser } from "../index"

describe("parser.block.chapter", () => {
	it.each([
		{ label: "single chapter with paragraph", input: "===\nChapter paragraph\n" },
		{ label: "chapter followed by another chapter", input: "===\nChapter one\n\n===\nChapter two\n" },
		{ label: "chapter with heading and paragraph", input: "===\n# Header\nBody text\n" }
	])("$label", ({ input }) => expect((parser.block.parse(input) || []).map(node => node.toObject())).toMatchSnapshot())
})
