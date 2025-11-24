import { dom } from "@typeup/dom"
import { Source } from "../Source"

export namespace block {
	let parsers: { parse: (source: Source) => dom.Block[] | undefined; priority: number }[] = []
	export function register(parser: (source: Source) => dom.Block[] | undefined, priority?: number) {
		if (!priority)
			priority = 0
		parsers.push({ parse: parser, priority })
		parsers = parsers.sort((left, right) => right.priority - left.priority)
	}
	export function parse(source: Source): dom.Block[] | undefined {
		let result: dom.Block[] | undefined
		let i = 0
		do
			result = parsers[i++]?.parse(source)
		while (!result && i < parsers.length)
		return result
	}
	export function parseAll(source: Source): dom.Block[] | undefined {
		let result: dom.Block[] | undefined
		let r: dom.Block[] | undefined
		while ((r = parse(source)) && r.length > 0)
			result = result ? result.concat(r) : r
		filters.forEach(filter => (result = result && result.filter(filter)))
		return result
	}
	const filters: ((block: dom.Block) => boolean)[] = []
	export function addFilter(filter: (block: dom.Block) => boolean) {
		filters.push(filter)
	}
}
