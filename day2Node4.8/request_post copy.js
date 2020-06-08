// 灌水 post提交数据
// 注册 提交留言 贴吧 qq留言等

// qq空间灌水
let count = 100;
function showMsg() {
    const url = "https://user.qzone.qq.com/proxy/domain/taotao.qzone.qq.com/cgi-bin/emotion_cgi_re_feeds?qzonetoken=c2991c513c4250735ceb0711041b203fd8ac051153ebba87bd89ce40eb03bfcc13b21ed2364692cf7d&g_tk=1822238229";
    const https = require("https");
    const querystring = require("querystring");
    
    count++;
    const postData = querystring.stringify({
        topicId: '1242983509_556c164a6c289d5e26df0400__1',
        feedsType: 100,
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        plat: 'qzone',
        source: 'ic',
        hostUin: 1242983509,
        isSignIn: '',
        platformid: 52,
        uin: 1227624471,
        format: 'fs',
        ref: 'feeds',
        content: '生日快乐',
        richval: '',
        richtype: '',
        private: 0,
        paramstr: 1,
        qzreferrer: 'https://user.qzone.qq.com/1227624471?_t_=0.8991564537209444'
    });

    const options = {
        hostname: "h5.qzone.qq.com",
        port: 443,
        path: "/proxy/domain/taotao.qzone.qq.com/cgi-bin/emotion_cgi_re_feeds?qzonetoken=a493886216716ee37c128a6b31f04769d130dafb91e621676cf42ae2c7f8125e55ca59e019bc4934eb&g_tk=1822238229",
        method: "POST",
        headers: {
            [":authority"]: 'user.qzone.qq.com',
            [':method']: 'POST',
            [':path']: '/proxy/domain/taotao.qzone.qq.com/cgi-bin/emotion_cgi_re_feeds?qzonetoken=a493886216716ee37c128a6b31f04769d130dafb91e621676cf42ae2c7f8125e55ca59e019bc4934eb&g_tk=1822238229',
            [':scheme']: 'https',
            ['accept']: '*/*',
            ['accept-encoding']: 'gzip, deflate, br',
            ['accept-language']: 'zh-CN,zh;q=0.9',
            ['content-length']: '360',
            ['content-type']: 'application/x-www-form-urlencoded;charset=UTF-8',
            ['cookie']: 'zzpaneluin=; zzpanelkey=; pgv_pvi=3752640512; pgv_si=s5566003200; _qpsvr_localtk=0.9191329249732689; pgv_pvid=1601434812; pgv_info=ssid=s8813165987; uin=o1227624471; skey=@eScaTb69a; RK=qug4hUIyUn; ptcz=dbc804f39cc3552ff499a336d5b9a67791773586adb41ec1a24b5fe40bc19246; p_uin=o1227624471; pt4_token=47BmNDZlLMVrYyEGv6cBNDtf0xs2fHdI-TVFHLVIA2c_; p_skey=HCW9KA6XKu3Y8LtPpsjkx9hFaBhak4aHKwjbWYPbqew_; Loading=Yes; qz_screen=1366x768; QZ_FE_WEBP_SUPPORT=1; cpu_performance_v8=16; rv2=806E37AEDB292F98785211EAD41DC32E40E991F93668CA44BD; property20=F8B8A5054940F9680AE9F7DC39A4B281A7E7068A13178843405D7B46BCF1FCDE4DFFCF986265FB0E',
            ['origin']: 'https://user.qzone.qq.com',
            ['referer']: 'https://user.qzone.qq.com/1227624471?_t_=0.8991564537209444',
            ['sec-fetch-dest']: 'empty',
            ['sec-fetch-mode']: 'cors',
            ['sec-fetch-site']: 'same-origin',
            ['user-agent']: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
            ['qzonetoken']: 'c2991c513c4250735ceb0711041b203fd8ac051153ebba87bd89ce40eb03bfcc13b21ed2364692cf7d',     
            ['g_tk']: '1822238229'
        }
    }
    // 发起灌水
    const req = https.request(options, res => {
        console.log("状态码：", res.statusCode);
        console.log("请求头：", querystring.stringify(res.headers));
        res.setEncoding("utf8");    //解决中文乱码

        // 监听数据传输
        res.on("data", d => {
            console.log("响应内容为：" + d);

        });
        // 监听传输结束
        res.on("end", () => {
            console.log("响应完毕");
        });
    });
    req.on("error", err => {
        console.log("请求失败---" + err);
    });

    // 将数据写入请求主体
    req.write(postData);    //!!!!!!!!!!
    req.end();
}
setInterval(showMsg, 1000);