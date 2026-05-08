import { parser } from "../index"

describe("parser.block.video", () => {
	it.each([
		["!video https://example.com/video.mp4\nVideo caption.", "with-video"],
		["!video https://example.com/video.mp4 classA classB\nVideo caption.", "with-classes"]
	])("%s - %s", input => expect(parser.block.parse(input)?.map(node => node.toObject())).toMatchSnapshot())
})
