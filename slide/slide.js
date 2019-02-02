var log = console.log.bind(console)

var e = function(selector) {
    var element = document.querySelector(selector)
    if (element == null) {
        var s = `元素没找到，选择器 ${selector} 没有找到或者 js 没有放在 body 前面`
        alert(s)
    } else {
        return element
    }
}

var es = function(selector) {
    var elements = document.querySelectorAll(selector)
    if (elements.length == 0) {
        var s = `元素没找到，选择器 ${selector} 没有找到或者 js 没有放在 body 前面`
        alert(s)
    } else {
        return elements
    }
}

var bindAll = function(selector, eventName, callback) {
    var elements = es(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.addEventListener(eventName, callback)
    }
}

var removeClassAll = function(className) {
    var selector = '.' + className
    var elements = es(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}
var showImagAtIndex = (index) => {
    var selector = '#img-' + String(index)
    e(selector).classList.add('active')
}

var bindEventIndi = () => {
    bindAll('.indi', 'mouseover', function () {
        removeClassAll('active')
        var self = event.target
        self.classList.add('active')
        var index = self.dataset.index
        showImagAtIndex(index)
    })
}
var nextIndex = (slide, offset) => {
    var numberOfImgs = Number(slide.dataset.imgs)
    var activeIndex = Number(slide.dataset.active)
    var i = (activeIndex + offset + numberOfImgs) % numberOfImgs
    log('i', i, typeof i)
    return i
}
var bindEventSlide = () => {
    bindAll('.slide-btn', 'click', function () {
        removeClassAll('active')
        var self = event.target
        var button = self.closest('.slide-btn')
        var offset = Number(button.dataset.offset)
        var slide = e('.carousel-inner')
        var newIndex = nextIndex(slide, offset)
        slide.dataset.active = newIndex
        showImagAtIndex(newIndex)
    })
}

var bindEvents = () => {
    bindEventIndi()
    bindEventSlide()
}
var __main = () => {
    bindEvents()
}

__main()
