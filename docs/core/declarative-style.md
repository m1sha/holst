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

	@track-bar-rect          = 0, height - trackSize, width - trackSize - 2, trackSize
	@arrow-button-size       = trackSize, trackSize
	@left-arrow-button-rect  = @track-bar-rect.xy, @arrow-button-size
	@right-arrow-button-rect = @track-bar-rect.e - trackSize, @track-bar-rect.y, @arrow-button-size

	new layer scroll-box frozen
		add track-bar      @track-bar-rect
		add arrow-button   @left-arrow-button-rect
		add arrow-button   @right-arrow-button-rect
		add arrow-left     @left-arrow-button-rect.c  + { -5, 0 }
		add arrow-right    @right-arrow-button-rect.c + { -5, 0 }
		add h-scroll-thumb limit, trackSize
```

```
import scroll-button
layer scroll-box frozen

var n = 5
var m = 2

mixin arrow-button-mixin
	@hover = { self.style = :hover }
	@leave  = { self.style = : }
	@click = { self.style = :focus }
	@blur = { self.style = : }

shape arrow-left:scroll-button (x, y) -> scroll
	move-to     x, y + m
	line-to x + n, y - n
	line-to x - n, y - n
	close
	[arrow-button-mixin]

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