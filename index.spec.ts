import { parser } from "./index.js"

describe("parser", () => {
	it("returns undefined for parser.parse(undefined)", () => expect(parser.parse(undefined)).toBeUndefined())
	it.each([{ label: "parser.open(undefined)", path: undefined }] as const)("returns undefined for $label", ({ path }) =>
		expect(parser.open(path)).toBeUndefined())
	it.each([
		{
			name: "simple document",
			document: `
class = paper
title = Document Title
date = 2015-11-10
author = John Doe

# Header Level 1
Paragraph A _emphasized text_ a lot of [http://example.com other nonsense]. This paragraph spans
several lines and so
it should. And here is %a small bit of code% and another one with a bit of formula: $x^2 + y^2 = z^2$.
`
		}
	] satisfies { name: string; document: string }[])("parse($name)", ({ document }) =>
		expect(parser.parse(document)).toMatchSnapshot())
	it("parser.open handles invalid and valid locations", () => {
		expect(parser.open("???")).toBeUndefined()
		expect(() => parser.open("/home/smika/versioned/typeup/parser/example/subdocument.tup")).not.toThrow()
		expect(() => parser.open("file:///home/smika/versioned/typeup/parser/example/subdocument.tup")).not.toThrow()
		expect(parser.open("/home/smika/versioned/typeup/parser/example/does-not-exist.tup")).toBeUndefined()
	})
})
