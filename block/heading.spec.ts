import { Error, IO } from "@cogneco/mend"
import { Source } from "../Source"
import { parse } from "."

describe("block.heading", () => {
	it("level 1", () => {
		const result = parse(new Source(IO.StringReader.create("# Heading\n"), new Error.ConsoleHandler())) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
	it("level 2", () => {
		const result = parse(new Source(IO.StringReader.create("## Heading\n"), new Error.ConsoleHandler())) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
	it("level 3", () => {
		const result = parse(new Source(IO.StringReader.create("### Heading\n"), new Error.ConsoleHandler())) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
	it("level 4", () => {
		const result = parse(new Source(IO.StringReader.create("#### Heading\n"), new Error.ConsoleHandler())) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
	it("level 5", () => {
		const result = parse(new Source(IO.StringReader.create("##### Heading\n"), new Error.ConsoleHandler())) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
	it("level 6", () => {
		const result = parse(new Source(IO.StringReader.create("###### Heading\n"), new Error.ConsoleHandler())) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})
