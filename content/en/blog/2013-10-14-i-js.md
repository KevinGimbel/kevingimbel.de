---
categories:
- coding
- javascript
date: 2013-10-14T00:00:00Z
title: i-js
tags:
    - javascript
aliases:
  - /i-js/
---

Today I decided to dig deeper into JavaScript and experiment a bit with scope, query selection and the general manipulation of the DOM. To do so I set up an object to store all my functions - this is not necessary but definitely more fun.

After naming my Object $ (because I new this from jQuery and I thought it would look cool) I renamed it to `I` and here comes the fun part: While learning JS I build i.js - a tiny JS "Framework" that enables you to write JS nearly the same you'd speak.
For example you may thing: *"I want to get the Object with the class name test"* - to get this, simply write the following:

```javascript 
I.WantA.classname("test");
```

This will return you the element that has the class `test`. Not so cool? Well, let's bring Events to the game!

```javascript 
// Spoken: "I want to add an Event that when you click on the 
// element with the ID js-removeClass a FUNCTION triggers"
I.WantTo.addEvent("click", "js-removeClass",function(){
	I.WantTo.removeClass("output","lorem");
});
```

The above script does the following:

* When `js-removeClass` is clicked
* the class `lorem` will be removed from an element with the class `output`

You can find a working Demo on [CodePen](http://codepen.io/kevingimbel/pen/sgCae) or [directly on my site](http://kevingimbel.com/i.js/demo/). If you want to contribute more functions I'd be very happy!

Beside of this useless but fun Framework I also wrote a kinda useful function: `_match()`. `_match()` takes any value and checks if it's a ID, a class or an Tag Name. When it matches one of these it returns the correct element. 
```javascript 
var _match = function(el) {
    a = document.querySelector("."+el);
    b = document.getElementById(el);
    c = document.getElementsByTagName(el);
    if(a != null) {
        return a;
    }
    if(b != null) {
        return b;
    }
    if(c != undefined) {
        return c[0];
    }
};
```
