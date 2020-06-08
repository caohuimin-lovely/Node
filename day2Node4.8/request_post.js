// 灌水 post提交数据
// 注册 提交留言 贴吧 qq留言等

// qq空间灌水
let count = 100;
function showMsg() {
    const url = "https://h5.qzone.qq.com/proxy/domain/m.qzone.qq.com/cgi-bin/new/add_msgb?qzonetoken=d04e2dd9d9f6b15b67da6151e54ba64ee7cd6bee11533122010403a850527f921ac56056b064668f2267&g_tk=1104961312";
    const https = require("https");
    const querystring = require("querystring");
    
    count++;
    const postData = querystring.stringify({
        content: '灌水666' + count,
        hostUin: 980850738,
        uin: 1227624471,
        format: 'fs',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        iNotice: 1,
        ref: 'qzone',
        json: 1,
        g_tk: 1104961312,
        qzreferrer: 'https://user.qzone.qq.com/proxy/domain/qzs.qq.com/qzone/msgboard/msgbcanvas.html#page=1'
    });

    const options = {
        hostname: "h5.qzone.qq.com",
        port: 443,
        path: "/proxy/domain/m.qzone.qq.com/cgi-bin/new/add_msgb?qzonetoken=d04e2dd9d9f6b15b67da6151e54ba64ee7cd6bee11533122010403a850527f921ac56056b064668f2267&g_tk=1104961312",
        method: "POST",
        headers: {
            'authority': 'h5.qzone.qq.com',
            'method': 'POST',
            'path': '/proxy/domain/m.qzone.qq.com/cgi-bin/new/add_msgb?qzonetoken=d04e2dd9d9f6b15b67da6151e54ba64ee7cd6bee11533122010403a850527f921ac56056b064668f2267&g_tk=1104961312',
            'scheme': 'https',
            'accept': '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'zh-CN,zh;q=0.9',
            'content-length': postData.length,
            'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'cookie': 'uin=o1227624471; skey=@C9BQDz5jP; RK=9mg4l0ISUH; ptcz=43c2e4e9f29b369b99a409351985b421ef7a0c7c772c0e8409629c6a79ebe675; p_uin=o1227624471; pgv_pvid=9866904705; pgv_info=ssid=s9020870375; QZ_FE_WEBP_SUPPORT=1; welcomeflash=927265436_81695; qqmusic_uin=; qqmusic_fromtag=; qqmusic_key=; pt4_token=jORV38hS3bP1ZxbvJjXh-nWeM-KscGvl0fGI2hdIUlc_; p_skey=oXFguh1fO*Zhqlo3MjPpbQ1X1inBHFltL7MRwf4O-1o_; pgv_pvi=2616403968; pgv_si=s6192502784; qzmusicplayer=qzone_player_927265436_1586362501070; cpu_performance_v8=21; __Q_w_s_hat_seed=1; rv2=803A70EED9E9C556C31F2BB58FBB62D0AA9D04F958F5783E0E; property20=B175389F7BBC6C0F2EE9C8A6D7AD8BAB7D00C413D8D566979218AD48E801385CB648FBB10377DDEB',
            'origin': 'https://user.qzone.qq.com',
            'referer': 'https://user.qzone.qq.com/980850738',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36'
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