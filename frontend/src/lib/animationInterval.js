export function animationInterval(ms, signal, callback) {
    // Prefer currentTime, as it'll better sync animtions queued in the 
    // same frame, but if it isn't supported, performance.now() is fine.
    const start = document.timeline ? document.timeline.currentTime : performance.now();
  
    function frame(time) {
      if (signal.aborted) return;
      callback(time);
      scheduleFrame(time);
    }
  
    function scheduleFrame(time) {
      const elapsed = time - start;
      const roundedElapsed = Math.round(elapsed / ms) * ms;
      const targetNext = start + roundedElapsed + ms;
      const delay = targetNext - performance.now();
      setTimeout(() => requestAnimationFrame(frame), delay);
    }
  
    scheduleFrame(start);
  }