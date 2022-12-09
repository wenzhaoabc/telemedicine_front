import request from '@/utils/request'

export function addDiagnosis(doctorId,problem) {
    return request({
        url: 'diagnosis/add',
        method: 'post',
        params: {"doctorId":doctorId,
                "problem":problem},
    })
}

export function updateDiagnosis(recordId,review,score) {
    return request({
        url: 'diagnosis/update',
        method: 'post',
        params: {"recordId":recordId,
                "review":review,
                "score":score},
    })
}

export function getProblem(recordId) {
    return request({
        url: 'diagnosis/getProblem',
        method: 'get',
        params: {"recordId":recordId},
    })
}