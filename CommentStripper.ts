import { mendly } from "mendly"

export class CommentStripper extends mendly.Reader {
	private backend: mendly.Reader.Buffered
	private last: string | undefined
	private disableUntil?: string
	get readable(): boolean {
		return this.backend.readable
	}
	get opened(): boolean {
		return this.backend.opened
	}
	get tabSize(): number {
		return this.backend.tabSize
	}
	get empty(): boolean {
		return this.backend.empty
	}
	get resource(): mendly.Uri {
		return this.backend.resource
	}
	get location(): mendly.Error.Location {
		return this.backend.location
	}
	get region(): mendly.Error.Region {
		return this.backend.region
	}
	constructor(backend: mendly.Reader) {
		super()
		this.backend =
			backend instanceof mendly.Reader.Buffered
				? (backend as mendly.Reader.Buffered)
				: mendly.Reader.Buffered.create(backend)
	}
	read(): string | undefined {
		const peeked = this.backend.peek(2)
		switch (peeked) {
			case "++": // diagram block
			case "%%": // code block
				this.disableUntil = !this.disableUntil ? peeked : this.disableUntil == peeked ? undefined : this.disableUntil
				break
			case "//":
				if (!this.disableUntil && this.last != ":")
					while (this.backend.peek() != "\n")
						this.backend.read()
				break
			case "/*":
				if (!this.disableUntil) {
					while (this.backend.peek(2) != "*/")
						this.backend.read()
					this.backend.read(2)
				}
				break
		}
		return (this.last = this.backend.read())
	}
	mark(): mendly.Error.Region {
		return this.backend.mark()
	}
	close(): Promise<boolean> {
		return this.backend.close()
	}
}
