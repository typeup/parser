import { mendly } from "mendly"
import { parser } from "../index"

describe("parser.block.frame", () => {
	it.each([
		["!frame https://example.com/page.html\nFrame caption.", "with-source"],
		["!frame https://example.com/page.html classA classB\nFrame caption.", "with-classes"]
	])("%s - %s", input => expect(parser.block.parse(input)?.map(node => node.toObject())).toMatchSnapshot())
})
