/* eslint-disable no-unused-vars */
/* eslint-env jquery, browser */
import autocomplete from './lib/autocomplete';
import { $, $$ } from './lib/bling';

$(document).ready(() => {
  autocomplete($('#address'), $('#lat'), $('#lng'));
});
