import { dom } from "@typeup/dom"
import { Source } from "../Source"

export namespace inline {
	let parsers: { parse: (source: Source) => dom.Inline[] | undefined; priority: number }[] = []
	export function addParser(parser: (source: Source) => dom.Inline[] | undefined, priority?: number) {
		if (!priority)
			priority = 0
		parsers.push({ parse: parser, priority })
		parsers = parsers.sort((left, right) => right.priority - left.priority)
	}
	export function parse(source: Source): dom.Inline[] | undefined {
		let result: dom.Inline[] | undefined
		let peeked: string | undefined
		while (
			(peeked = source.peek()) &&
			peeked.length > 0 &&
			parsers.some(p => {
				const r = p.parse(source)
				if (r)
					result = result ? result.concat(r) : r
				return !!r
			})
		);
		return result
	}
}
