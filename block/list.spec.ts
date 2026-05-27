import { parser } from "../index"

describe("parser.block.list", () => {
	it.each([
		{ name: "ordered single item", input: "1. First item" },
		{ name: "ordered multiple items", input: "1. First\n1. Second\n1. Third" },
		{ name: "ordered nested list", input: "1. Outer\n\t1. Inner" },
		{ name: "ordered followed by paragraph", input: "1. Item\nA paragraph" },
		{ name: "ordered empty line between items", input: "1. First\n\n1. Second" },
		// failed: { name: "ordered mixed item density", input: "1. First\n1. Second\n\t1. Nested" },

		{ name: "unordered single item", input: "- First item" },
		{ name: "unordered multiple items", input: "- First\n- Second\n- Third" },
		{ name: "unordered nested list", input: "- Outer\n\t- Inner" },
		{ name: "unordered followed by paragraph", input: "- Item\nA paragraph" },
		{ name: "unordered empty line between items", input: "- First\n\n- Second" },
		// failed: { name: "unordered mixed item density", input: "- First\n- Second\n\t- Nested" },

		{ name: "parse mixed", input: "- one\n\t# heading\n" },
		{ name: "parse sparse", input: "- \n\t# heading\n\n- \n\t# another\n" },

		{ name: "dash followed by space parses as paragraph", input: "-" },
		{ name: "parses list marker followed by eof after whitespace", input: "- " },
		// failed: { name: "normalizes mixed inline and nested items", input: "- Parent\n\t- Child\n- Plain\n" },
		// failed: { name: "wraps inline-only items when mixed with block content", input: "- one\n-\n\t# heading\n" },
		// failed: { name: "handles double-indented continuation content", input: "-\n\t\tinner\n-\n\t\tsecond\n" },
		// failed: { name: "handles indented-only items and merge with empty lines", input: "-\n\t- child\n\n-\n\tvalue\n" },
		// failed: { name: "keeps block-only list items sparse", input: "-\n\t# first\n\n-\n\t# second\n" },
		{ name: "keeps non-inline continuation inside merged list item", input: "- \n- seed\n\t# heading\n" }
	] as const)("$name", ({ input }) => expect(parser.block.parse(input)?.map(node => node.toObject())).toMatchSnapshot())
})
describe("parser.block.list.toString", () => {
	it.each([
		{ name: "ordered single item", input: "1. First item" },
		{ name: "ordered multiple items", input: "1. First\n1. Second\n1. Third" },
		{ name: "ordered nested list", input: "1. Outer\n\t1. Inner" },
		{ name: "ordered followed by paragraph", input: "1. Item\nA paragraph" },
		// failed: { name: "ordered mixed item density", input: "1. First\n1. Second\n\t1. Nested" },

		{ name: "unordered single item", input: "- First item" },
		{ name: "unordered multiple items", input: "- First\n- Second\n- Third" },
		{ name: "unordered nested list", input: "- Outer\n\t- Inner" },
		{ name: "unordered followed by paragraph", input: "- Item\nA paragraph" },
		// failed: { name: "unordered mixed item density", input: "- First\n- Second\n\t- Nested" },

		{ name: "parse mixed", input: "- one\n\t# heading" },
		{ name: "parse sparse", input: "- # heading\n- # another" },

		{ name: "dash followed by space parses as paragraph", input: "-" },
		{ name: "parses list marker followed by eof after whitespace", input: "- " },
		// failed: { name: "normalizes mixed inline and nested items", input: "- Parent\n\t- Child\n- Plain\n" }
		// failed: { name: "wraps inline-only items when mixed with block content", input: "- one\n- # heading\n" },
		// failed: { name: "handles double-indented continuation content", input: "- \n\t\tinner\n- \n\t\tsecond\n" },
		// failed:{ name: "keeps block-only list items sparse", input: "- \n\t# first\n\n-\n\t# second\n" },
		{ name: "keeps non-inline continuation inside merged list item", input: "- \n- seed\n\t# heading" }
	] as const)("$name", ({ input }) =>
		expect(
			parser.block
				.parse(input)
				?.map(node => node.toString())
				.join("\n")
		).toMatch(input))
})
