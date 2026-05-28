import { mendly } from "mendly"
import { Source } from "./Source.js"

export type Importer = (uri: mendly.Uri) => Source | string | undefined
