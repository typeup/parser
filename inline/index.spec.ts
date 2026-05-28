import { parser } from "../index.js"

describe("parser.inline.index", () => {
	it("returns undefined for inline.parse(undefined)", () => expect(parser.inline.parse(undefined)).toBeUndefined())
})
