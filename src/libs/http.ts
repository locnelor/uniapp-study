const baseUrl = "http://localhost:14500"


let access_token;
export interface RequestConfig {
    method?: "GET" | "POST",
    data?: any
}
export const request = async (url: string, {
    method = "GET",
    data,
}: RequestConfig = {}) => {
    return await uni.request({
        url: `${baseUrl}/${url}`,
        method,
        data,
        timeout: 5000
    }).then(({ data }) => data);
}
export const login = () => {
    return new Promise((resolve, rejects) => {
        uni.login({
            provider: "weixin",
            success({ code }) {
                request("wechart/login", {
                    method: "POST",
                    data: { code }
                }).then((e: any) => {
                    access_token = e.access_token;
                    resolve("");
                }).catch(rejects)
            },
            fail(result) {
                rejects(result);
            }
        })
    })
}
export default request