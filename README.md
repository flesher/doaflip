#Underflip.js
##jQuery plugin for UI animations

Underflip makes it easy to apply flipping animations using CSS3 and jQuery. 

*Current Verson: 0.9.1*

##How it works

Call `.underflip()` on any element you want to apply animation to.

Pass in object to specify animation properties.

```javascript 
$('element').underflip({
      init        : 'open',    // open or closed
      perspective : 600,       // css transform perspective (px) 
      axis        : 'X',       // X or Y
      origin      : 50,        // origin 0-100 (%)
      speed       : 500,       // animation time (ms)
      ease        : 'ease-in', //easing type
      rotation    : -180       //amount of rotation (deg)
});
```

##TODO:
1. add/remove classes on intervals of 90deg
2. support multiple transition states
3. fall back to js animation if CSS3 is not available

