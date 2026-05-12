import { dom } from "@typeup/dom"
import { Source } from "../Source"
import { inline } from "./inline"

function parse(source: Source): dom.Inline[] | undefined {
	let result: dom.Inline[] | undefined
	if (source.readIf("[")) {
		const s = source.till([" ", "]"])
		const target = s.till("|").readAll() ?? ""
		if (!target) s.raise("Empty link target.", "recoverable", "link-target-empty", s.mark())
		const flags = parseFlags(s)
		result = [
			new dom.Inline.Link(
				target,
				source.readIf(" ")
					? inline.parse(source.till("]")) || []
					: [new dom.Inline.Text(target, source.mark()) as dom.Inline],
				flags,
				source.mark()
			)
		]
		if (!source.readIf("]")) source.raise('Expected "]" as end of link.', "critical", "link-end", source.mark())
	}
	return result
}
function parseFlags(source: Source): dom.Inline.Link.Flag[] {
	const result: dom.Inline.Link.Flag[] = []
	if (source.readIf("|"))
		do {
			const flagSource = source.till("|")
			const flagValue = flagSource.readAll()
			if (dom.Inline.Link.Flag.is(flagValue)) {
				result.push(flagValue)
				flagSource.mark() // Advance marker baseline for next flag's error region
			} else
				flagSource.raise(
					flagValue ? `Unknown link flag: ${flagValue}` : "Empty link flag.",
					"recoverable",
					"link-flag",
					flagSource.mark()
				)
		} while (source.readIf("|"))
	return result
}
inline.addParser(parse)
