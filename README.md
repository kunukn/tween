# tween

Run a tween with fixed duration. Update callback is invoked on progress of the tween. The progress is a range value from [0;1]. 
The value 0 and 1 is guaranteed to be called during the tween.

## usage

examples

```
var tween = require("@kunukn/tween");
var log = console.log.bind(console);

function onComplete(arg){
  log(arg);
  log('** example done');
}

log('**  example start');
tween({ duration: 500, update: log, complete: onComplete });
```

```
import tween from '@kunukn/tween';
const onUpdate = range => console.log(range);
const onComplete = ({ startTime, now, elapsedTime }) => console.log(startTime, now, elapsedTime);
tween({ duration: 500, update: onUpdate, complete: onComplete });
```

tween arguments:

* duration in milli seconds
* update is a function called on tween update with range value between [0;1]
* complete is function called when the tween is done

## npm

https://www.npmjs.com/package/@kunukn/tween

## cdn

https://unpkg.com/@kunukn/tween/

