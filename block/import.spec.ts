import { mendly } from "mendly/node"
import { parser } from "../index"

class CollectingErrorHandler implements mendly.Error.Handler {
	public errors: mendly.Error[] = []
	raise(error: mendly.Error): void {
		this.errors.push(error)
	}
}

describe("parser.block.import", () => {
	it("imports subdocument", () =>
		expect(
			(parser.block.parse("!import ./example/subdocument\n", new mendly.Error.Handler.Console()) || []).map(node =>
				node.toObject()
			)
		).toMatchSnapshot())
	it.each([
		{ label: "empty path with newline", input: "!import \n" },
		{ label: "empty path", input: "!import " },
		{ label: "space in path", input: "!import a b\n" },
		{ label: "invalid uri", input: "!import http://[bad\n" },
		{ label: "invalid bracket", input: "!import [\n" },
		{ label: "missing newline", input: "!import ./example/subdocument" },
		{ label: "non-openable path", input: "!import ./%\n" },
		{ label: "missing file", input: "!import ./example/does-not-exist\n" }
	])("$label", ({ input }) => {
		const handler = new CollectingErrorHandler()
		parser.block.parse(input, handler)
		expect(handler.errors.length).toBeGreaterThan(0)
	})
})
