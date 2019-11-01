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

describe("block.definitionList", () => {
	it("simple", () => {
		const result = parse(new Source(IO.StringReader.create("Term 1\n: Description 1\n: Description A\nTerm 2\n: Description 2\n"), new Error.ConsoleHandler())) || []
		expect(result.map(node => node.toObject())).toEqual([
			{
				class: "Block.DefinitionList",
				content: [
					{
						class: "Block.DefinitionTerm",
						content: [
							{
								"class": "Inline.Text",
								"value": "Term 1\n",
							},
						],
						"data": [
								{
									"class": "Block.DefinitionData",
									"content": [
										{
											"class": "Inline.Text",
											"value": "Description 1\n",
										},
									],
								},
								{
									"class": "Block.DefinitionData",
									"content": [
										{
											"class": "Inline.Text",
											"value": "Description A\n",
										},
									],
								},
							],
						},
						{
							"class": "Block.DefinitionTerm",
							"content": [
								{
									"class": "Inline.Text",
									"value": "Term 2\n",
								},
							],
							"data": [
								{
									"class": "Block.DefinitionData",
									"content": [
										{
											"class": "Inline.Text",
											"value": "Description 2\n",
										},
									],
								},
							],
					},
				],
			},
		])
	})
})
