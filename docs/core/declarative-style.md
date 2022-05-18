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

var n = 5
var m = 2

shape arrow-left:scroll-button (x, y) -> scroll 
	move-to     x, y + m
	line-to x + n, y - n
	line-to x - n, y - n
	close

shape arrow-right:scroll-button (x, y) -> scroll 
	move-to x + m, y
	line-to x - n, y - n 
	line-to x - n, y + n
	close

shape arrow-up:scroll-button  (x, y) -> scroll
	move-to     x, y - m
	line-to x + n, y + n
	line-to x - n, y + n
	close

shape arrow-down:scroll-button  (x, y) -> scroll
	move-to     x, y + m
	line-to x + n, y - n
	line-to x - n, y - n
	close
```

or minimalistic

```
! scroll-button
# scroll

$ n = 5, m = 2

+ arrow-left:scroll-button (x, y) -> scroll
	M  x, y + m
	LT x + n, y - n
	LT x - n, y - n
	z

+ arrow-right:scroll-button (x, y) -> scroll
	M  x + m, y
	LT x - n, y - n 
	LT x - n, y + n
	z

+ arrow-up:scroll-button (x, y) -> scroll
	M  x, y - m
	LT x + n, y + n
	LT x - n, y + n
	z

+ arrow-down:scroll-button (x, y) -> scroll 
	M  x, y + m
	LT x + n, y - n
	LT x - n, y - n
	z
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