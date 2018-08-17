// 数据中心 -- 文件
import File from '@/components/propertyChildren/files/index'
import FileType from '@/components/propertyChildren/files/FileType'
import Document from '@/components/propertyChildren/files/File'

const file = [
    {
        path: '/floder',
        name: 'File',
        component: File,
        children: [
            {
                path: '/floder/fileType',
                name: 'FileType',
                component: FileType
            },
            {
                path: `/floder/document:id`,
                name: 'Document',
                component: Document
            }
        ]
    }
]

export default file
