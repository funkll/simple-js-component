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

const timeTick = (timer) => {
    const p = new Promise((resolve, reject) => {
        e('.timer-btn').addEventListener('click', function () {
            e('.timer-content').classList.toggle('show')
            timer = 0
        })
        setInterval(function () {
            timer += 1
            e('.timer-content').textContent = timer
        }, 1000)
    })
    return p
}

timeTick(0)

