import { mendly } from "mendly"
import { parser } from "."

const simpleDocument = `
class = paper
title = Document Title
date = 2015-11-10
author = John Doe

# Header Level 1
Paragraph A _emphasized text_ a lot of [http://example.com other nonsense]. This paragraph spans
several lines and so
it should. And here is %a small bit of code% and another one with a bit of formula: $x^2 + y^2 = z^2$.
`

describe("parser.parse", () => {
	it("basic", () => {
		const result = parser.parse(mendly.Reader.String.create(simpleDocument), new mendly.Error.Handler.Console())
		if (!result)
			expect(result)
		else
			expect(result.toObject()).toEqual({
				class: "document",
				content: [
					{
						class: "block.assignment",
						name: "class",
						value: "paper",
					},
					{
						class: "block.assignment",
						name: "title",
						value: "Document Title",
					},
					{
						class: "block.assignment",
						name: "date",
						value: "2015-11-10",
					},
					{
						class: "block.assignment",
						name: "author",
						value: "John Doe",
					},
					{
						class: "block.heading",
						content: [
							{
								class: "inline.text",
								value: "Header Level 1",
							},
						],
						level: 1,
					},
					{
						class: "block.paragraph",
						content: [
							{
								class: "inline.text",
								value: "Paragraph A ",
							},
							{
								class: "inline.emphasize",
								content: [
									{
										class: "inline.text",
										value: "emphasized text",
									},
								],
							},
							{
								class: "inline.text",
								value: " a lot of ",
							},
							{
								class: "inline.link",
								content: [
									{
										class: "inline.text",
										value: "other nonsense",
									},
								],
								target: "http://example.com",
							},
							{
								class: "inline.text",
								value: ". This paragraph spans\n",
							},
							{
								class: "inline.text",
								value: "several lines and so\n",
							},
							{
								class: "inline.text",
								value: "it should. And here is ",
							},
							{
								class: "inline.code",
								value: "a small bit of code",
							},
							{
								class: "inline.text",
								value: " and another one with a bit of formula: ",
							},
							{
								class: "inline.math",
								value: "x^2 + y^2 = z^2",
							},
							{
								class: "inline.text",
								value: ".\n",
							},
						],
					},
				],
			})
	})
})
