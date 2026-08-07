import React, { useEffect } from 'react';
import $ from 'jquery';
import 'jquery.ripples';

export default function CustomCursor() {
  useEffect(() => {
    // Water Ripple effect from README
    try {
      if (typeof $.fn.ripples === 'function') {
        $('body').ripples({
          resolution: 512,
          dropRadius: 20,
          perturbance: 0.04,
        });

        // cursor-follow ripple
        let last = 0;
        $(document).on('mousemove', function (e) {
          const now = Date.now();
          if (now - last < 80) return;
          last = now;

          $('body').ripples('drop', e.clientX, e.clientY, 10, 0.04);
        });
      }
    } catch (_) {
      console.warn('Ripples not supported', e);
    }

    return () => {
      try {
        if (typeof $.fn.ripples === 'function') {
          $('body').ripples('destroy');
          $(document).off('mousemove');
        }
      } catch (_) {}
    };
  }, []);

  return null;
}
