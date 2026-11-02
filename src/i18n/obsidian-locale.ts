/**
 * Reads Obsidian's active interface language without adding a plugin setting.
 */
import { moment } from "obsidian";
import { normalizeLocale } from "./locale";

export function getObsidianLocale(): string {
	return normalizeLocale(moment.locale());
}
