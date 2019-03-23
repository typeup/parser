import * as dom from "@typeup/dom"
import { Source } from "../Source"

let parsers: { parse: ((source: Source) => dom.block.Block[] | undefined), priority: number }[] = []
export function addParser(parser: (source: Source) => dom.block.Block[] | undefined, priority?: number) {
	if (!priority)
		priority = 0
	parsers.push({ parse: parser, priority})
	parsers = parsers.sort((left, right) => right.priority - left.priority)
}
export function parse(source: Source): dom.block.Block[] | undefined {
	let result: dom.block.Block[] | undefined
	let i = 0
	do
		result = parsers[i++].parse(source)
	while (!result && i < parsers.length)
	return result
}
export function parseAll(source: Source): dom.block.Block[] | undefined {
	let result: dom.block.Block[] | undefined
	let r: dom.block.Block[] | undefined
	while ((r = parse(source)) && r.length > 0)
		result = result ? result.concat(r) : r
	filters.forEach(filter => result = result && result.filter(filter))
	return result
}
const filters: ((block: dom.block.Block) => boolean)[] = []
export function addFilter(filter: (block: dom.block.Block) => boolean) {
	filters.push(filter)
}
