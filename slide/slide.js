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

var showImgAtIndex = (index) => {
    removeClassAll('show')
    var selector = '#img-' + String(index)
    e(selector).classList.add('show')

    removeClassAll('active')
    var indi = '#indi-' + String(index)
    e(indi).classList.add('active')
}

var bindEventIndi = () => {
    bindAll('.indi', 'mouseover', function () {
        var self = event.target
        self.classList.add('active')
        var index = self.dataset.index
        showImgAtIndex(index)
    })
}
var nextIndex = (slide, offset) => {
    var numberOfImgs = Number(slide.dataset.imgs)
    var activeIndex = Number(slide.dataset.active)
    var i = (activeIndex + offset + numberOfImgs) % numberOfImgs
    return i
}

var bindEventSlide = () => {
    bindAll('.slide-btn', 'click', function () {
        var self = event.target
        var button = self.closest('.slide-btn')
        var offset = Number(button.dataset.offset)
        var slide = e('.carousel-inner')
        var newIndex = nextIndex(slide, offset)
        slide.dataset.active = newIndex
        showImgAtIndex(newIndex)
    })
}

var playNextImg = () => {
    var slide = e('.carousel-inner')
    var newIndex = nextIndex(slide, 1)
    slide.dataset.active = newIndex
    showImgAtIndex(newIndex)
}

var autoPlay = () => {
    setInterval(function () {
        playNextImg()
    }, 2000)
}

var bindEvents = () => {
    bindEventIndi()
    bindEventSlide()
    autoPlay()
}
var __main = () => {
    bindEvents()
}

__main()
