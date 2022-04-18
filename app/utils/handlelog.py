import  logging

def handlelog(info):
    # 利用 logging 模块 加 setting 配置实现输出日志和保存日志
    logger_file= logging.getLogger('FilePut')
    logger_stdout = logging.getLogger('StdoutPut')
    logger_file.info(info)
    logger_stdout.info(info)
    return

