import { parser } from "../index"

describe("parser.block.index", () => {
	it("returns undefined for block.parse(undefined)", () => expect(parser.block.parse(undefined)).toBeUndefined())
})
