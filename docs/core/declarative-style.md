# Declarative Style

Format Vector Graphic Styles (*.vgs files)
```
.scroll-button
	fill         = #f5f5f5
	stroke       = #f5f5f5

	&:hover
		fill       = #a5a5a5
		stroke     = #a5a5a5

	&:focus
		fill       = #eee
		stroke     = #00e1
		line-width = 2
```

Format Vector Graphic markup Language (*.vgl files)
```
component h-scroll-bar
	:trackSize = ?
	:width     = ?
	:height    = ?
	:limit     = ?

	@trackBarRect         = 0, height - trackSize, width - trackSize - 2, trackSize
	@arrowButtonSize      = trackSize, trackSize
	@leftArrowButtonRect  = @trackBarRect.xy, @arrowButtonSize
	@rightArrowButtonRect = @trackBarRect.e - trackSize, @trackBarRect.y, @arrowButtonSize

	new layer scroll-box frozen
		add track-bar      @trackBarRect
		add arrow-button   @leftArrowButtonRect
		add arrow-button   @rightArrowButtonRect
		add arrow-left     @leftArrowButtonRect.c  + [ -5, center ]
		add arrow-right    @rightArrowButtonRect.c + [ -5, center ]
		add h-scroll-thumb limit, trackSize
```

```
import scroll-button

var n = 5
var m = 2

mixin arrow-button-mixin
	@hover = { self.style = :hover }
	@leave  = { self.style = : }
	@click = { self.style = :focus }
	@blur = { self.style = : }

shape arrow-left:scroll-button (x, y)
	move-to     x, y + m
	line-to x + n, y - n
	line-to x - n, y - n
	close
	[arrow-button-mixin]

shape arrow-right:scroll-button (x, y)
	move-to x + m, y
	line-to x - n, y - n
	line-to x - n, y + n
	close

shape arrow-up:scroll-button  (x, y)
	move-to     x, y - m
	line-to x + n, y + n
	line-to x - n, y + n
	close

shape arrow-down:scroll-button  (x, y)
	move-to     x, y + m
	line-to x + n, y - n
	line-to x - n, y - n
	close
```

or minimalistic

```
! scroll-button
# scroll *

$ n = 5, m = 2

+ arrow-left:scroll-button (x, y) -> scroll
	M  x, y + m
	LT x + n, y - n
	LT x - n, y - n
	z
	@hover = { : = :hover }
	@blur  = { : = : }
	@click = { : = :focus }

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