import { mendly } from "mendly"
import { CommentStripper } from "./CommentStripper"

export class Source extends mendly.Reader.Buffered implements mendly.Error.Handler {
	constructor(reader: mendly.Reader, private errorHandler: mendly.Error.Handler) {
		super(reader)
	}
	raise(message: mendly.Error): void
	raise(message: string, level?: mendly.Error.Level, type?: string, region?: mendly.Error.Region): void
	raise(
		message: string | mendly.Error,
		level?: mendly.Error.Level,
		type = "lexical",
		region?: mendly.Error.Region
	): void {
		if (!(message instanceof mendly.Error)) {
			if (!level)
				level = "critical"
			if (!region)
				region = this.region
			message = new mendly.Error(message as string, level, type, region)
		}
		this.errorHandler.raise(message as mendly.Error)
	}
	requirePrefix(prefix: string | string[]): Source {
		return new Source(new mendly.Reader.Prefix(this, prefix), this.errorHandler)
	}
	till(endMark: string | string[]): Source {
		return new Source(mendly.Reader.Till.create(this, endMark), this.errorHandler)
	}
	until(endMark: string | string[]): Source {
		return new Source(mendly.Reader.Until.create(this, endMark), this.errorHandler)
	}
	static from(
		content: string | mendly.Reader | undefined,
		handler: mendly.Error.Handler | undefined
	): Source | undefined {
		if (typeof content == "string")
			content = mendly.Reader.String.create(content)
		return content && new Source(new CommentStripper(content), handler ?? new mendly.Error.Handler.Console())
	}
}
export namespace Source {}
