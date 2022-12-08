import request from '@/utils/request'

export function addDiagnosis(doctorId,problem) {
    return request({
        url: 'diagnosis/add',
        method: 'post',
        params: {"doctorId":doctorId,
                "problem":problem},
    })
}

export function getProblem(recordId) {
    return request({
        url: 'diagnosis/getProblem',
        method: 'get',
        params: {"recordId":recordId},
    })
}