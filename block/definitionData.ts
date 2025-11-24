import { dom } from "@typeup/dom"
import { inline } from "../inline"
import { Source } from "../Source"

export namespace definitionData {
	export function parse(source: Source): dom.Block.List.Definition.Data[] | undefined {
		let result: dom.Block.List.Definition.Data[] | undefined
		if (source.readIf(": ")) {
			while ((source.peek() || "").match(/\s/))
				source.read()
			result = [new dom.Block.List.Definition.Data(inline.parse(source.until("\n")) || [], source.mark())]
			const next = parse(source)
			if (next)
				result.push(...next)
		}
		return result
	}
}
