import { Error, IO } from "@cogneco/mend"
import { Source } from "../Source"
import { parse } from "."

describe("block.paragraph", () => {
	it("simple", () => {
		const result = parse(new Source(IO.StringReader.create("This is a single paragraph."), new Error.ConsoleHandler())) || []
		expect(result.map(node => node.toObject())).toEqual([
			{
				class: "Block.Paragraph",
				content: [
					{
						class: "Inline.Text",
						value: "This is a single paragraph.",
					},
				],
			},
		])
	})
})
