import vue from 'vue'

function changeFilter(item) {
    if(item == 0){
        return "室内"
    }else {
        return "室外"
    }
}


const filters ={
    changeFilter
}

for (let key in filters) {
    vue.filter(key,filters[key])
}
