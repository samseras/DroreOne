// import PersonPlat from '@/components/person'
// import PersonType from '@/components/personChildren/personType'
// import PersonDeploy from '@/components/personChildren/personDeploy'       //人员

const person = [
    {
        path: '/person',
        name: 'PersonPlat',
        component: resolve => require(['@/components/person'], resolve),
        children: [
            {path: '/person/personType', name: "PersonType", component: resolve => require(['@/components/personChildren/personType'], resolve)},
            { path: '/person/:id',name: 'PersonDeploy', component: resolve => require(['@/components/personChildren/personDeploy'], resolve)}
        ]
    },
]

export default person
