var oldIE = false;
  if ($('html').is('.lt-ie7, .lt-ie8, .lt-ie9')) {
      oldIE = true;
  }
  oldIE ? $(".Browser").show() : null
