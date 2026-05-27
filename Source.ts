import { mendly } from "mendly"
import { CommentStripper } from "./CommentStripper"

export class Source extends mendly.Reader.Buffered implements mendly.Error.Handler {
	protected constructor(
		reader: mendly.Reader,
		protected errorHandler: mendly.Error.Handler = new mendly.Error.Handler.Console()
	) {
		super(reader)
	}
	protected create(reader: mendly.Reader): Source {
		return new Source(reader, this.errorHandler)
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
			if (!level) level = "critical"
			if (!region) region = this.region
			message = new mendly.Error(message as string, level, type, region)
		}
		this.errorHandler.raise(message as mendly.Error)
	}
	requirePrefix(prefix: string | string[]): Source {
		return this.create(new mendly.Reader.Prefix(this, prefix))
	}
	till(endMark: string | string[]): Source {
		return this.create(mendly.Reader.Till.create(this, endMark))
	}
	until(endMark: string | string[]): Source {
		return this.create(mendly.Reader.Until.create(this, endMark))
	}
	readIfAny(...patterns: string[]): string | undefined {
		let result: string | undefined
		for (const pattern of patterns)
			if (this.readIf(pattern)) {
				result = pattern
				break
			}
		return result
	}
	open(uri: mendly.Uri): Source | string | undefined {
		const location = uri.resolve(this.region.resource)
		const reader = mendly.Reader.open(location)
		return Source.from(reader, this.errorHandler)
	}
	static from(
		content: string | mendly.Reader | undefined,
		handler: mendly.Error.Handler | undefined
	): Source | undefined {
		return content
			? new this(
					new CommentStripper(typeof content == "string" ? mendly.Reader.String.create(content) : content),
					handler
				)
			: undefined
	}
}
export namespace Source {}
