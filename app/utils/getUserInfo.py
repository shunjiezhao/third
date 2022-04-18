from app.utils.handlelog import handlelog


def getUserInfo(request, username):
    userIp = getip(request)
    Info = "\t\t%s\t\t\t\t\t%s" % (username, userIp)
    handlelog(Info)
    return Info
# X-Forwarded-For:简称XFF头，它代表客户端，也就是HTTP的请求端真实的IP，只有在通过了HTTP 代理或者负载均衡服务器时才会添加该项。
def getip(request):
    '''获取请求者的IP信息'''
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')  # 判断是否使用代理
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]  # 使用代理获取真实的ip
    else:
        ip = request.META.get('REMOTE_ADDR')  # 未使用代理获取IP
    return ip
# 保存信息
# def save(ip, username, now):
#     saveDir = "%s/tmp/%s.log"%(settings.BASE_DIR, username)
#     with open(saveDir, mode="a+") as f:
#         f.writelines(username + ip + now + "\n")
#
#
