import request from '@/utils/request'

export function getDoctors() {
    return request({
        url: 'personalInfo/getDoctorsInfo',
        method: 'get',
    })
}

export function getDoctor(doctorId){
    return request({
        url: 'personalInfo/getDoctorInfo',
        method: 'get',
        params:{"doctorId":doctorId}
    })
}

export function getDoctorState(doctorId){
    return request({
        url: 'personalInfo/getDoctorState',
        method: 'get',
        params:{"doctorId":doctorId}
    })
}
export function getDoctorReviews(doctorId){
    return request({
        url: 'personalInfo/getDoctorReviews',
        method: 'get',
        params:{"doctorId":doctorId}
    })
}

export function updateDoctorState(doctorId){
    return request({
        url: 'personalInfo/updateDoctorState',
        method: 'post',
        params:{"doctorId":doctorId}
    })
}