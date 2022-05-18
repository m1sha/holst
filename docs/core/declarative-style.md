# Declarative Style

Format Vector Graphic Styles (*.vgs files)
```
.scroll-button:default
	fill       = #f5f5f5
	stroke     = #f5f5f5

.scroll-button:hover
	fill       = #a5a5a5
	stroke     = #a5a5a5

.scroll-button:focus
	fill       = #eee
	stroke     = #00e1
	line-width = 2
```

Format Vector Graphic markup Language (*.vgl files)
```
import scroll-button
layer scroll

shape arrow-left (x, y) -> scroll :scroll-button 
	move-to     x, y + 2
	line-to x + 5, y - 5
	line-to x - 5, y - 5
	close

shape arrow-right (x, y) -> scroll :scroll-button 
	move-to x + 2, y
	line-to x - 5, y - 5 
	line-to x - 5, y + 5
	close

shape arrow-up (x, y) -> scroll :scroll-button 
	move-to     x, y - 2
	line-to x + 5, y + 5
	line-to x - 5, y + 5
	close

shape arrow-down (x, y) -> scroll :scroll-button 
  move-to 		x, y + 2
  line-to x + 5, y - 5
  line-to x - 5, y - 5
  close
```

or in XML 

```xml
<style
	on:defualt
	name="scroll-button"
	fill="#f5f5f5"
	stroke="#f5f5f5"
/>
<style
	on:hover
	name="scroll-button"	
	fill="#f5f5f5" 
	stroke="#f5f5f5"	
/>
<style
	on:focus
	name="scroll-button"	
	fill="#f5f5f5"
	stroke="#f5f5f5"
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