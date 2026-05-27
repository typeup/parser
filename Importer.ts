import { mendly } from "mendly"
import { Source } from "./Source"

export type Importer = (uri: mendly.Uri) => Source | string | undefined
