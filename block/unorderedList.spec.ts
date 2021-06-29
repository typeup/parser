import { Error, IO } from "@cogneco/mend"
import { Source } from "../Source"
import { parse } from "."

describe("block.unorderedList", () => {
	it("single level", () => {
		const result = parse(new Source(IO.StringReader.create("- item A\n- item B\n"), new Error.ConsoleHandler())) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
	it("paragraph after", () => {
		const result = parse(new Source(IO.StringReader.create("- item A\n- item B\nThis is a simple list.\n"), new Error.ConsoleHandler())) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
	it("multi level", () => {
		const result = parse(new Source(IO.StringReader.create("- item A\n- item B\n\t- item B1\n\t- item B2\n- item C\n"), new Error.ConsoleHandler())) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
// start here
	it("multi level", () => {
		const result = parse(new Source(IO.StringReader.create("1. itemized A\n1. itemized B\n\t1. itemized B1\n\t1. itemized B2\n1. itemized C\n"), new Error.ConsoleHandler())) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})

	it("multi level", () => {
		const result = parse(new Source(IO.StringReader.create("- item A\n- item B\n\t1. itemized B1\n\t1. itemized B2\n- item C\n"), new Error.ConsoleHandler())) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
	it("multi level", () => {
		const result = parse(new Source(IO.StringReader.create("1. itemized A\n1. itemized B\n\t- item B1\n\t- item B2\n1. itemized C\n"), new Error.ConsoleHandler())) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})
