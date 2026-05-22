import { parser } from "./index"

describe("CommentStripper", () => {
	it.each([
		{ label: "line comments stripped outside blocks", input: "value = kept // stripped\n" },
		{ label: "block comments stripped outside blocks", input: "value = before /* stripped */ after\n" },
		{ label: "http link is not treated as comment", input: "[http://example.com Example]" },
		{ label: "comments are preserved in code blocks", input: "%%ts\nconst x = 1 // keep\n/* keep */\n%%\n" },
		{ label: "comments are preserved in diagram blocks", input: "++\na // keep\n/* keep */\n++\n" }
	] as const)("$label", ({ input }) =>
		expect(parser.block.parse(input)?.map(node => node.toObject())).toMatchSnapshot())
		it.each([
			{ label: "line comments stripped outside blocks", input: "value = kept // stripped\n" },
			{ label: "block comments stripped outside blocks", input: "value = before /* stripped */ after\n" },
			{ label: "protocol text is preserved", input: "http://example.com\n" }
		] as const)("$label", ({ input }) => expect(parser.parse(input)?.toObject()).toMatchSnapshot())
		it.each([
			{ label: "comments are preserved in code blocks", input: "%%ts\nconst x = 1 // keep\n/* keep */\n%%\n" },
			{ label: "comments are preserved in diagram blocks", input: "++\na // keep\n/* keep */\n++\n" }
		] as const)("$label", ({ input }) => expect(parser.parse(input)?.toObject()).toMatchSnapshot())
})
