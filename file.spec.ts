import { mendly } from "mendly"
import { open, parse } from "./file"

describe("file", () => {
	it("parse(undefined) returns undefined", () => expect(parse(undefined)).toBeUndefined())
	it("open(undefined) returns undefined", () => expect(open(undefined)).toBeUndefined())
	it("parse(reader) returns a file", () =>
		expect(parse(mendly.Reader.String.create("name = value\n"))?.toObject()).toMatchSnapshot())
})
