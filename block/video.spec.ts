import { mendly } from "mendly"
import { parser } from "../index.js"

describe("parser.block.video", () => {
	it.each([
		{ label: "with video", input: "!video https://example.com/video.mp4\nVideo caption." },
		{ label: "with classes", input: "!video https://example.com/video.mp4 classA classB\nVideo caption." },
		{ label: "missing newline", input: "!video https://example.com/video.mp4" }
	])("$label", ({ input }) =>
		expect((parser.block.parse(input, new mendly.Error.Handler.Console()) || []).map(node => node.class)).toContain(
			"block.video"
		))
	it("invalid uri does not create video", () =>
		expect((parser.block.parse("!video \nCaption\n") || []).map(node => node.class)).not.toContain("block.video"))
})
