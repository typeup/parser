import * as dom from "@typeup/dom"
import { Source } from "../Source"
import * as inline from "./inline"

function parse(source: Source): dom.inline.Inline[] | undefined {
	let result: dom.inline.Inline[] | undefined
	let value = source.read()
	if (value == "\\")
		value = source.read()
	let region = source.mark()
	if (value && value != "\0") {
		result = inline.parse(source)
		if (!result)
			result = [new dom.inline.Text(value, region) as dom.inline.Inline]
		else if (result.length > 0 && result[0] instanceof dom.inline.Text) {
			value += (result[0] as dom.inline.Text).value
			region = region.merge(result[0].region)
			result[0] = new dom.inline.Text(value, region)
		} else
			result = [new dom.inline.Text(value, region) as dom.inline.Inline].concat(result)
	}
	return result
}
inline.addParser(parse, -1)
