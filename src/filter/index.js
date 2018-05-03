import vue from 'vue'

function changeFilter(item) {
    if(item == 0){
        return "室内"
    }else {
        return "室外"
    }
}
    function weekFilter (item) {
        if (item === null) {
            item = ''
        }
        let week = []
        if (item.includes('1')) {
            week.push('周一')
        }
        if (item.includes('2')) {
            week.push('周二')
        }
        if (item.includes('3')) {
            week.push('周三')
        }
        if (item.includes('4')) {
            week.push('周四')
        }
        if (item.includes('5')) {
            week.push('周五')
        }
        if (item.includes('6')) {
            week.push('周六')
        }
        if (item.includes('7')) {
            week.push('周日')
        }
        return week.join()
    }


const filters ={
    changeFilter,
    weekFilter
}

for (let key in filters) {
    vue.filter(key,filters[key])
}
