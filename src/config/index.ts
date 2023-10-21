//const apiUrl: string = "https://do.diba.cat/api/dataset/actesbiblioteques_ca/camp-data_inici-greater/datetime:2023-10-20_09:00:00/camp-municipi_nom-like/Barcelona/pag-ini/1/pag-fi/2";
import { createI18n } from 'vue-i18n';
import messages from '@intlify/unplugin-vue-i18n/messages';
function getApiUrl(date: Date): string {
    const formattedDate = date.toISOString().replace(/\.\d{3}/, '');
    const apiUrl = `https://do.diba.cat/api/dataset/actesbiblioteques_ca/camp-data_inici-greater/datetime:${formattedDate}/camp-municipi_nom-like/Barcelona/pag-ini/1/pag-fi/2`;
    return apiUrl;
}

// Example usage:
const apiUrl = getApiUrl(new Date('2023-10-20T09:00:00'));
console.log(apiUrl); // Output: "https://do.diba.cat/api/dataset/actesbiblioteques_ca/camp-data_inici-greater/datetime:2023-10-20T09:00:00/camp-municipi_nom-like/Barcelona/pag-ini/1/pag-fi/2"

export {
    apiUrl
};