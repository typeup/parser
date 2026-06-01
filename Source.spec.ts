import { mendly } from "mendly"
import { parser } from "./index.js"

class CollectingErrorHandler implements mendly.Error.Handler {
	public errors: mendly.Error[] = []
	raise(error: mendly.Error): void {
		this.errors.push(error)
	}
}

describe("Source", () => {
	it("returns undefined for undefined", () => expect(parser.parse(undefined)).toBeUndefined())
	it("accepts reader input", () => {
		expect(parser.parse(mendly.Reader.String.create("name = value\n"))?.dehydrate()).toMatchSnapshot()
	})
	it("forwards lexical errors to the handler", () => {
		const handler = new CollectingErrorHandler()
		parser.parse("#", handler)
		expect(handler.errors).toHaveLength(1)
		expect(handler.errors[0]?.level).toBe("critical")
		expect(handler.errors[0]?.type).toBe("lexical")
		expect(handler.errors[0]?.region).toBeDefined()
	})
})
