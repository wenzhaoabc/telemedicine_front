import request from '@/utils/request'

export function getDoctors() {
    return request({
        url: 'personalInfo/getDoctorsInfo',
        method: 'get',
    })
}