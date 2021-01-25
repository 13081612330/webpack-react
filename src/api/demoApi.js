import request from './request'

export function submitPrj(param) {
    return request({
        url: 'api/pmp-sfu-store/plStoreProvinceAlone/qryProvinceAlonePrjs',
        method: 'post',
        data: JSON.stringify(param),
    })
}
export function getSubmitPrj(param) {
    return request({
        url: '/pmp-plan-compile/adjust/release/submitPrj',
        method: 'post',
        data: JSON.stringify(param),
        headers: {
            'content-type': 'application/json;charset=UTF-8'
          }
    })
}