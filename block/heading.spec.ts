import { Error, IO } from "@cogneco/mend"
import { Source } from "../Source"
import { parse } from "."

describe("block.heading", () => {
	it("level 1", () => {
		const result = parse(new Source(IO.StringReader.create("# Heading\n"), new Error.ConsoleHandler())) || []
		expect(result.map(node => node.toObject())).toEqual([
			{
				class: "Block.Heading",
				level: 1,
				content: [
					{
						class: "Inline.Text",
						value: "Heading",
					},
				],
			},
		])
	})
	it("level 2", () => {
		const result = parse(new Source(IO.StringReader.create("## Heading\n"), new Error.ConsoleHandler())) || []
		expect(result.map(node => node.toObject())).toEqual([
			{
				class: "Block.Heading",
				level: 2,
				content: [
					{
						class: "Inline.Text",
						value: "Heading",
					},
				],
			},
		])
	})
	it("level 3", () => {
		const result = parse(new Source(IO.StringReader.create("### Heading\n"), new Error.ConsoleHandler())) || []
		expect(result.map(node => node.toObject())).toEqual([
			{
				class: "Block.Heading",
				level: 3,
				content: [
					{
						class: "Inline.Text",
						value: "Heading",
					},
				],
			},
		])
	})
	it("level 4", () => {
		const result = parse(new Source(IO.StringReader.create("#### Heading\n"), new Error.ConsoleHandler())) || []
		expect(result.map(node => node.toObject())).toEqual([
			{
				class: "Block.Heading",
				level: 4,
				content: [
					{
						class: "Inline.Text",
						value: "Heading",
					},
				],
			},
		])
	})
	it("level 5", () => {
		const result = parse(new Source(IO.StringReader.create("##### Heading\n"), new Error.ConsoleHandler())) || []
		expect(result.map(node => node.toObject())).toEqual([
			{
				class: "Block.Heading",
				level: 5,
				content: [
					{
						class: "Inline.Text",
						value: "Heading",
					},
				],
			},
		])
	})
	it("level 6", () => {
		const result = parse(new Source(IO.StringReader.create("###### Heading\n"), new Error.ConsoleHandler())) || []
		expect(result.map(node => node.toObject())).toEqual([
			{
				class: "Block.Heading",
				level: 6,
				content: [
					{
						class: "Inline.Text",
						value: "Heading",
					},
				],
			},
		])
	})
})
