import { Error, IO } from "@cogneco/mend"
import { Source } from "../Source"
import { parse } from "."

describe("block.math", () => {
	it("simple", () => {
		const result = parse(new Source(IO.StringReader.create("$$\na^2 + b^2 = c^2$$\nMath Caption."), new Error.ConsoleHandler())) || []
		expect(result.map(node => node.toObject())).toEqual([
			{
				class: "Block.Math",
				value: "a^2 + b^2 = c^2",
				content: [
					{
						class: "Inline.Text",
						value: "Math Caption.",
					},
				],
			},
		])
	})
})
