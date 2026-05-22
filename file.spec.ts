import { mendly } from "mendly"
import { parser } from "./index"

describe("file", () => {
	it("parse(undefined) returns undefined", () => expect(parser.parse(undefined)).toBeUndefined())
	it("open(undefined) returns undefined", () => expect(parser.open(undefined)).toBeUndefined())
	it("open(missing) returns undefined", () => {
		expect(parser.open("./example/does-not-exist.tup")).toBeUndefined()
	})
	it("parse(reader) returns a document", () => {
		const document = parser.parse(mendly.Reader.String.create("name = value\n"))
		expect(document?.class).toBe("document")
		expect(document?.content[0]?.class).toBe("block.assignment")
	})
})
