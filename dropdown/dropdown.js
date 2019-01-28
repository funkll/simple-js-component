var log = console.log.bind(console)
var es = function(selector) {
    var element = document.querySelectorAll(selector)
    if (element == null) {
        var s = `元素没找到，选择器 ${selector} 没有找到或者 js 没有放在 body 前面`
        alert(s)
    } else {
        return element
    }
}
var bindAll = function(selector, eventName, callback) {
    var elements = es(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.addEventListener(eventName, callback)
    }
}

var handleOptionSelected = () => {
    var self = event.target
    var menu = self.parentElement
    menu.classList.toggle('hide')

    var newContent = self.textContent
    var dropDown = self.closest('.dropdown')
    var title = dropDown.querySelector('.title')

    title.textContent = newContent
    title.dispatchEvent(new Event('change'))
}

var handleTitleChange = () => {
    var self = event.target
    var dropDown = self.closest('.dropdown')
    var title = dropDown.querySelector('#result')
    title.innerHTML = 'The result is: ' + event.target.textContent
}

var toggleShow = () => {
    bindAll('.dropdown','click', function () {
        var self = event.target
        var d = self.closest('.dropdown')
        var menu = d.querySelector('.menu')
        if (self.classList.contains('title')) {
            menu.classList.toggle('hide')
        }
        if (self.classList.contains('option')) {
            handleOptionSelected()
            handleTitleChange()
        }
    })
}

var __main = function () {
    toggleShow()
}

__main()
