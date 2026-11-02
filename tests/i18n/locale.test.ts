/**
 * Verifies locale normalization and language fallback for the localization
 * layer.
 */
import { describe, expect, it } from "vitest";
import { normalizeLocale, resolveLocale } from "../../src/i18n/locale";

describe("normalizeLocale", () => {
	it("canonicalizes locale tags and separators", () => {
		expect(normalizeLocale("de_de")).toBe("de-DE");
		expect(normalizeLocale("EN-gb")).toBe("en-GB");
	});

	it("uses English for missing or invalid locales", () => {
		expect(normalizeLocale(undefined)).toBe("en");
		expect(normalizeLocale("not a locale!!")).toBe("en");
	});
});

describe("resolveLocale", () => {
	const supportedLocales = ["en", "de"];

	it("matches a supported locale or its base language", () => {
		expect(resolveLocale("de-DE", supportedLocales)).toBe("de");
		expect(resolveLocale("en", supportedLocales)).toBe("en");
	});

	it("uses the fallback when the language is not supported", () => {
		expect(resolveLocale("fr-FR", supportedLocales)).toBe("en");
	});
});
