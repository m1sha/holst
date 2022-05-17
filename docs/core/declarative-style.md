# Declarative Style

Format *.gvl files

```
styles
	.scroll-button:default
		fill= hex#f5f5f5
		stroke= hex#f5f5f5

	.scroll-button:hover
		fill= hex#a5a5a5
		stroke= hex#a5a5a5

	.scroll-button:focus
		fill= hex#eee
		stroke= hex#00e1
		line-width= 2

layer scroll

shape arrow-left -> scroll @scroll-button (x, y)
	move-to x= { x     } y= { y + 2 }
	line-to x= { x + 5 } y= { y - 5 }
	line-to x= { x - 5 } y= { y - 5 }
	close
```

or

```xml
<style
	on:defualt
	name="scroll-button"
	fill="hex#f5f5f5"
	stroke="hex#f5f5f5"
/>
<style
	on:hover
	name="scroll-button"	
	fill="hex#f5f5f5" 
	stroke-style="hex#f5f5f5"	
/>
<style
	on:focus
	name="scroll-button"	
	fill="hex#f5f5f5"
	stroke="hex#f5f5f5"
	line-width="2"
/>
<layer id="scroll" />
<shape id="arrow-left" layer-id="scroll" style="scroll-button" params={ x, y }>
	<move-to x={ x } y={ y + 2 } />
	<line-to x={ x + 5 } y={ y - 5 } />
	<line-to x={ x - 5 } y={ y - 5 } />
	<close />
</shape>
```