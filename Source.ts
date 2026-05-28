import { mendly } from "mendly"
import { CommentStripper } from "./CommentStripper.js"
import { Importer } from "./Importer.js"

export class Source extends mendly.Reader.Buffered implements mendly.Error.Handler {
	private constructor(
		reader: mendly.Reader,
		private errorHandler: mendly.Error.Handler = new mendly.Error.Handler.Console(),
		private importer?: Importer
	) {
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
			if (!level) level = "critical"
			if (!region) region = this.region
			message = new mendly.Error(message as string, level, type, region)
		}
		this.errorHandler.raise(message as mendly.Error)
	}
	requirePrefix(prefix: string | string[]): Source {
		return new Source(new mendly.Reader.Prefix(this, prefix), this.errorHandler, this.importer)
	}
	till(endMark: string | string[]): Source {
		return new Source(mendly.Reader.Till.create(this, endMark), this.errorHandler, this.importer)
	}
	until(endMark: string | string[]): Source {
		return new Source(mendly.Reader.Until.create(this, endMark), this.errorHandler, this.importer)
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
	open(locator: mendly.Uri): Source | string | undefined {
		return (
			this.importer
			?? ((locator: mendly.Uri): Source | string | undefined => {
				const location = locator.resolve(this.region.resource)
				const reader = mendly.Reader.open(location)
				return Source.from(reader, this.errorHandler, this.importer)
			})
		)(locator)
	}
	static from(
		content: string | mendly.Reader | undefined,
		handler?: mendly.Error.Handler | undefined,
		importer?: Importer
	): Source | undefined {
		return content
			? new this(
					new CommentStripper(typeof content == "string" ? mendly.Reader.String.create(content) : content),
					handler,
					importer
				)
			: undefined
	}
}
export namespace Source {}
