import { Error, IO } from "@cogneco/mend"
import { Source } from "../Source"
import { parse } from "."

describe("block.code", () => {
	it("simple", () => {
		const result = parse(new Source(IO.StringReader.create("%%\ncode block\n%%\nFigure Caption."), new Error.ConsoleHandler())) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
	it("html", () => {
		const result = parse(new Source(IO.StringReader.create("%% html\n<html>\n<head>\n<title>Title</title>\n</head>\n<body>\n</body>\n</html>\n%%\ncode Caption."), new Error.ConsoleHandler())) || []
		expect(result.map(node => node.toObject())).toMatchSnapshot()
	})
})
