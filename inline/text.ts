import { dom } from "@typeup/dom"
import { Source } from "../Source"
import { inline } from "./inline"

function parse(source: Source): dom.Inline[] | undefined {
	let result: dom.Inline[] | undefined
	let value = source.read()
	if (value == "\\")
		value = source.read()
	let region = source.mark()
	if (value && value != "\0") {
		result = inline.parse(source)
		if (!result)
			result = [new dom.Inline.Text(value, region) as dom.Inline]
		else if (result.length > 0 && result[0] instanceof dom.Inline.Text) {
			value += (result[0] as dom.Inline.Text).value
			region = region.merge(result[0].region)
			result[0] = new dom.Inline.Text(value, region)
		} else
			result = [new dom.Inline.Text(value, region) as dom.Inline].concat(result)
	}
	return result
}
inline.addParser(parse, -1)
