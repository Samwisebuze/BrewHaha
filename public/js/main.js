/* eslint-env jquery, browser */
import autocomplete from './modules/autocomplete';
import { $, $$ } from './modules/bling';
$(document).ready(() => {
  autocomplete($('#address'), $('#lat'), $('#lng'));
});
