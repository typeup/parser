import { parser } from "../index.js"

describe("parser.block.index", () => {
	it("returns undefined for block.parse(undefined)", () => expect(parser.block.parse(undefined)).toBeUndefined())
})
