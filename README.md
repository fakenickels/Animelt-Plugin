# Animelt-Plugin

My toy for complex animations (css3 fallbacks)

## Getting Started

### In the browser
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/grsabreu/Animelt-Plugin/master/dist/animelt.min.js
[max]: https://raw.github.com/grsabreu/Animelt-Plugin/master/dist/animelt.js

In your web page:

```html
<script src="animelt.min.js"></script>	
<script type="text/javascript">
	$("div").animelt({
		width: "40px",
		border: "2px solid #000"
	}, 1, function(){
		console.log("It's finished!");
	}); // fantastic

	$("div").animelt({
		transform: "rotateX(30deg) rotateY(120deg)"
	}, 600); // incredible	

</script>
```

## Examples
See examples in http://grsabreu.github.io/Animelt-Plugin

## License
Copyright (c) 2013 Gabriel Rubens  
Licensed under the MIT license.

## Buy me a soda ;)
[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=8T9ZSYVZWYRXN)
