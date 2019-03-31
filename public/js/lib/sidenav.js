/* eslint-disable no-param-reassign */

function sidenav(nav) {
  const open = '250px';
  const close = '0px';
  nav.addListener('onClick', () => {
    let w = nav.style.width;
    switch (w) {
      case open:
        w = close;
        break;
      case close:
        w = open;
        break;
      default:
        w = close;
    }
    nav.style.width = '250px';
  });
}

export default sidenav;
