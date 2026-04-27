import { mendly } from "mendly"
import { parser } from "../index"

describe("parser.block.heading", () => {
	it("level 1", () => {
		const result = parser.block.parse("# Heading\n", new mendly.Error.Handler.Console()) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
	it("level 2", () => {
		const result = parser.block.parse("## Heading\n", new mendly.Error.Handler.Console()) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
	it("level 3", () => {
		const result = parser.block.parse("### Heading\n", new mendly.Error.Handler.Console()) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
	it("level 4", () => {
		const result = parser.block.parse("#### Heading\n", new mendly.Error.Handler.Console()) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
	it("level 5", () => {
		const result = parser.block.parse("##### Heading\n", new mendly.Error.Handler.Console()) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
	it("level 6", () => {
		const result = parser.block.parse("###### Heading\n", new mendly.Error.Handler.Console()) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})
