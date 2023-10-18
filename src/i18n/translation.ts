import i18n from "@/i18n";
import { nextTick } from "vue";

interface Trans {
  defaultLocale: string;
  supportedLocales: string[];
  currentLocale: string;
  switchLanguage(newLocale: string): Promise<void>;
  loadLocaleMessages(locale: string): Promise<void>;
  isLocaleSupported(locale: string): boolean;
  getUserLocale(): { locale: string; localeNoRegion: string };
  getPersistedLocale(): string | null;
  guessDefaultLocale(): string;
  routeMiddleware(to: any, _from: any, next: any): Promise<void>;
  i18nRoute(to: any): any;
}

const Trans: Trans = {
  get defaultLocale() {
    return "ca";
  },

  get supportedLocales() {
    return "ca,en,es".split(",");
  },

  get currentLocale() {
    return i18n.global.locale.value;
  },

  set currentLocale(newLocale) {
    i18n.global.locale.value = newLocale;
  },

  async switchLanguage(newLocale) {
    await Trans.loadLocaleMessages(newLocale);
    Trans.currentLocale = newLocale;
    document.querySelector("html").setAttribute("lang", newLocale);
    localStorage.setItem("user-locale", newLocale);
  },

  async loadLocaleMessages(locale) {
    if (!i18n.global.availableLocales.includes(locale)) {
      const messages = await import(`@/i18n/locales/${locale}.json`);
      i18n.global.setLocaleMessage(locale, messages.default);
    }

    return nextTick();
  },

  isLocaleSupported(locale) {
    return Trans.supportedLocales.includes(locale);
  },

  getUserLocale() {
    const locale =
      window.navigator.language || Trans.defaultLocale;

    return {
      locale: locale,
      localeNoRegion: locale.split("-")[0],
    };
  },

  getPersistedLocale() {
    return null;
  },

  guessDefaultLocale() {
    const userPersistedLocale = Trans.getPersistedLocale();
    if (userPersistedLocale) {
      return userPersistedLocale;
    }

    const userPreferredLocale = Trans.getUserLocale();

    if (Trans.isLocaleSupported(userPreferredLocale.locale)) {
      return userPreferredLocale.locale;
    }

    if (Trans.isLocaleSupported(userPreferredLocale.localeNoRegion)) {
      return userPreferredLocale.localeNoRegion;
    }

    return Trans.defaultLocale;
  },

  async routeMiddleware(to, _from, next) {
    const paramLocale = to.params.locale;

    if (!Trans.isLocaleSupported(paramLocale)) {
      return next(Trans.guessDefaultLocale());
    }

    await Trans.switchLanguage(paramLocale);

    return next();
  },

  i18nRoute(to) {
    return {
      ...to,
      params: {
        locale: Trans.currentLocale,
        ...to.params,
      },
    };
  },
};

export default Trans;