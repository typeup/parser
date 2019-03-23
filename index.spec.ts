import { Error, IO } from "@cogneco/mend"
import * as parser from "."

const simpleDocument =
`
class = paper
title = Document Title
date = 2015-11-10
author = John Doe

# Header Level 1
Paragraph A _emphasized text_ a lot of [http://example.com other nonsens]. This paragraph spans
several lines and so
it should. And here is %a small bit of code% and another one with a bit of formula: $x^2 + y^2 = z^2$.
`

describe("parser.parse", () => {
	it("basic", () => {
		const result = parser.parse(IO.StringReader.create(simpleDocument), new Error.ConsoleHandler())
		if (!result)
			expect(result)
		else
			expect(result.toObject()).toEqual(
				{
					"class": "Document",
					"content": [
						{
							"class": "Block.Assignment",
							"name": "class",
							"value": "paper",
						},
						{
							"class": "Block.Assignment",
							"name": "title",
							"value": "Document Title",
						},
						{
							"class": "Block.Assignment",
							"name": "date",
							"value": "2015-11-10",
						},
						{
							"class": "Block.Assignment",
							"name": "author",
							"value": "John Doe",
						},
						{
							"class": "Block.Heading",
							"content": [
								{
									"class": "Inline.Text",
									"value": "Header Level 1",
								},
							],
							"level": 1,
						},
						{
							"class": "Block.Paragraph",
							"content": [
								{
									"class": "Inline.Text",
									"value": "Paragraph A ",
								},
								{
									"class": "Inline.Emphasize",
									"content": [
										{
											"class": "Inline.Text",
											"value": "emphasized text",
										},
									],
								},
								{
									"class": "Inline.Text",
									"value": " a lot of ",
								},
								{
									"class": "Inline.Link",
									"content": [
										{
											"class": "Inline.Text",
											"value": "other nonsens",
										},
									],
									"target": "http://example.com",
								},
								{
									"class": "Inline.Text",
									"value": ". This paragraph spans\n",
								},
								{
									"class": "Inline.Text",
									"value": "several lines and so\n",
								},
								{
									"class": "Inline.Text",
									"value": "it should. And here is ",
								},
								{
									"class": "Inline.Code",
									"value": "a small bit of code",
								},
								{
									"class": "Inline.Text",
									"value": " and another one with a bit of formula: ",
								},
								{
									"class": "Inline.Math",
									"value": "x^2 + y^2 = z^2",
								},
								{
									"class": "Inline.Text",
									"value": ".\n",
								},
							],
						},
					],
				},
			)
	})
})
