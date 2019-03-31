/* eslint-disable no-unused-vars */
/* eslint-env jquery, browser */
import autocomplete from './lib/autocomplete';
import { $, $$ } from './lib/bling';
import sidenav from './lib/sidenav';

$(document).ready(() => {
  autocomplete($('#address'), $('#lat'), $('#lng'));
  sidenav($('filterSideNav'));
});
