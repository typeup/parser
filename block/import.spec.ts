import { Error, IO } from "@cogneco/mend"
import { Source } from "../Source"
import { parse } from "."

describe("block.import", () => {
	it("simple", () => {
		const result = parse(new Source(IO.StringReader.create("!import ./example/subdocument\n"), new Error.ConsoleHandler())) || []
		expect(result.map(node => node.toObject())).toEqual([
			{
				"class": "Block.Import",
				"content": {
					"class": "File",
					"content": [
						{
							"class": "Block.Heading",
							"content": [
								{
									"class": "Inline.Text",
									"value": "Header",
								},
							],
							"level": 1,
						},
						{
							"class": "Block.Paragraph",
							"content": [
								{
									"class": "Inline.Text",
									"value": "This is a paragraph.\n",
								},
							],
						},
					],
				},
				"source": "./example/subdocument",
			}])
	})
})
