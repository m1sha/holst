# Declarative Style

Format *.gvl files

```
layer scroll

style scroll-button:default
	fill-style={ hex#f5f5f5 } 
	stroke-style={ buttonBorderColor }	

style scroll-button:hover
	fill-style={ hex#f5f5f5 } 
	stroke-style={ buttonBorderColor }	

style scroll-button:focus
	name="scroll-button"	
	fill-style={ hex#f5f5f5 } 
	stroke-style={ buttonBorderColor }	

shape arrow-left -> scroll @scroll-button (x, y)
	move-to x={ x     } y={ y + 2 }
	line-to x={ x + 5 } y={ y - 5 }
	line-to x={ x - 5 } y={ y - 5 }
	close
```

or

```xml
<layer id="scroll" />
<style
	on:defualt
	name="scroll-button"
	fill-style={ hex#f5f5f5 } 
	stroke-style={ buttonBorderColor }	
/>
<style
	on:hover
	name="scroll-button"	
	fill-style={ hex#f5f5f5 } 
	stroke-style={ buttonBorderColor }	
/>
<style
	on:focus
	name="scroll-button"	
	fill-style={ hex#f5f5f5 } 
	stroke-style={ buttonBorderColor }	
/>
<shape id="arrow-left" layer-id="scroll" style="scroll-button" params={ x, y }>
	<move-to x={ x } y={ y + 2 } />
	<line-to x={ x + 5 } y={ y - 5 } />
	<line-to x={ x - 5 } y={ y - 5 } />
	<close />
</shape>
```