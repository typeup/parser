import { mendly } from "mendly"
import { Source } from "../Source"
import { block } from "."

describe("parser.block.heading", () => {
	it("level 1", () => {
		const result =
			block.parse(new Source(mendly.Reader.String.create("# Heading\n"), new mendly.Error.Handler.Console())) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
	it("level 2", () => {
		const result =
			block.parse(new Source(mendly.Reader.String.create("## Heading\n"), new mendly.Error.Handler.Console())) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
	it("level 3", () => {
		const result =
			block.parse(new Source(mendly.Reader.String.create("### Heading\n"), new mendly.Error.Handler.Console())) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
	it("level 4", () => {
		const result =
			block.parse(new Source(mendly.Reader.String.create("#### Heading\n"), new mendly.Error.Handler.Console())) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
	it("level 5", () => {
		const result =
			block.parse(new Source(mendly.Reader.String.create("##### Heading\n"), new mendly.Error.Handler.Console())) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
	it("level 6", () => {
		const result =
			block.parse(new Source(mendly.Reader.String.create("###### Heading\n"), new mendly.Error.Handler.Console())) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})
