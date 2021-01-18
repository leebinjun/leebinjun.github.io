import os


def rename():
    path = input("请输入路径(例如D:\\\\picture)：")
    name = input("请输入开头名:")
    start_number = input("请输入开始数:")
    file_type = input("请输入后缀名（如 .jpg、.txt等等）:")
    print("正在生成以" + name + start_number + file_type + "迭代的文件名")
    count = 0
    file_list = os.listdir(path)
    for files in file_list:
        old_dir = os.path.join(path, files)
        new_dir = os.path.join(path, name + str(count + int(start_number)) + file_type)
        os.rename(old_dir, new_dir)
        count += 1
    print("一共修改了" + str(count) + "个文件")


rename()
