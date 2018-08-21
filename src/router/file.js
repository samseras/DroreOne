// 数据中心 -- 文件
// import File from '@/components/propertyChildren/files/index'
// import FileType from '@/components/propertyChildren/files/FileType'
// import Document from '@/components/propertyChildren/files/File'

const file = [
    {
        path: '/floder',
        name: 'File',
        component: resolve => require(['@/components/propertyChildren/files/index'], resolve),
        children: [
            {
                path: '/floder/fileType',
                name: 'FileType',
                component: resolve => require(['@/components/propertyChildren/files/FileType'], resolve)
            },
            {
                path: `/floder/document:id`,
                name: 'Document',
                component: resolve => require(['@/components/propertyChildren/files/File'], resolve)
            }
        ]
    }
]

export default file
