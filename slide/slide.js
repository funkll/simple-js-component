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
//todo 拿到按钮的id,用这个id匹配到相应的图片
//并且把当前激活的图片id标记到data-active
var showImagAtIndex = (index) => {
    removeClassAll('active')
    var selector = '#img-' + String(index)
    e(selector).classList.add('active')
}

//todo 点击按钮，清掉所有active,给点击的按钮添加active
var bindEventIndi = () => {
    bindAll('.indi', 'mouseover', function () {
        var self = event.target
        self.classList.add('active')
        var index = self.dataset.index
        showImagAtIndex(index)
    })
}
//todo 利用offset 和 data-active计算出下一个图片的index
//off
var nextIndex = (slide, offset) => {
    var numberOfImgs = Number(slide.dataset.imgs)
    var activeIndex = Number(slide.dataset.active)
    var i = (activeIndex + offset + numberOfImgs) % numberOfImgs
    log('i', i, typeof i)
    return i
}
//todo 点击左右按钮,改变data-active的值
//计算出下个index， offset 是-+1的意思，并显示下个index
//要想利用凯撒函数，必须用0，1，2，3
//一开始要把data-active 和 img active, indi active匹配，才不会让打开的时候很奇怪
var bindEventSlide = () => {
    bindAll('.slide-btn', 'click', function () {
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
