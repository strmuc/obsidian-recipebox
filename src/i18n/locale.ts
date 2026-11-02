/**
 * Locale normalization and translation-locale selection shared by the
 * localization layer. The fallback stays English until a catalog is added.
 */
export const DEFAULT_LOCALE = "en";

export function normalizeLocale(locale: string | undefined): string {
	if (!locale?.trim()) return DEFAULT_LOCALE;
	try {
		return Intl.getCanonicalLocales(locale.trim().replace(/_/g, "-"))[0] ?? DEFAULT_LOCALE;
	} catch {
		return DEFAULT_LOCALE;
	}
}

export function resolveLocale(
	locale: string | undefined,
	supportedLocales: readonly string[],
	fallbackLocale: string = DEFAULT_LOCALE,
): string {
	const normalized = normalizeLocale(locale).toLowerCase();
	const exactMatch = supportedLocales.find(
		(candidate) => normalizeLocale(candidate).toLowerCase() === normalized,
	);
	if (exactMatch) return exactMatch;

	const language = normalized.split("-")[0];
	return supportedLocales.find(
		(candidate) => normalizeLocale(candidate).toLowerCase().split("-")[0] === language,
	) ?? fallbackLocale;
}
