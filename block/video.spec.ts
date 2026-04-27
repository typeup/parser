import { mendly } from "mendly"
import { parser } from "../index"

describe("parser.block.video", () => {
	it.each([
		["!video https://example.com/video.mp4\nVideo caption.", "with-video"],
		["!video https://example.com/video.mp4 classA classB\nVideo caption.", "with-classes"]
	])("%s - %s", input => {
		const result = parser.block.parse(input, new mendly.Error.Handler.Console()) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})
