// import Organization from '@/components/Organization'
// import PersonRole from '@/components/Orginization/personRole'
// import PersonPost from '@/components/Orginization/personPost'
// import Department from '@/components/Orginization/Department'
// import PersonPlat from '@/components/person'
const organization = [
    {
        path: '/organization',
        name: 'Organization',
        component: resolve => require(['@/components/Organization'], resolve),
        redirect: '/person',
        meta: {id: '06'},
        children: [
            {
                path: '/person',
                name: 'PersonPlat',
                component: resolve => require(['@/components/person'], resolve),
                redirect: '/person/post',
                meta: {id: '06'},
                children: [
                    { path: '/person/post', name: "PersonPost", component: resolve => require(['@/components/Orginization/personRole'], resolve), meta: {id: '06'}},
                    { path: '/person/role',name: 'PersonRole', component: resolve => require(['@/components/Orginization/personPost'], resolve), meta: {id: '06'}},
                    { path: '/person/department',name: 'Department', component: resolve => require(['@/components/Orginization/Department'], resolve), meta: {id: '06'}},
                    { path: '/person/users',name: 'PersonDeploy', component: resolve => require(['@/components/personChildren/personDeploy'], resolve), meta: {id: '06'}},
                ]
            },
        ]
    }
]

export default organization
