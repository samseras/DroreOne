import PersonPlat from '@/components/person'
import PersonType from '@/components/personChildren/personType'
import PersonDeploy from '@/components/personChildren/personDeploy'       //人员

const person = [
    {
        path: '/person',
        name: PersonPlat,
        component: PersonPlat,
        children: [
            {path: '/person/personType', name: "PersonType", component: PersonType},
            { path: '/person/:id',name: 'PersonDeploy', component:PersonDeploy }
        ]
    },
]

export default person
