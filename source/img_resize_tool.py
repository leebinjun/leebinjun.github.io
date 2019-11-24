import os
from PIL import Image


def resize():
    path = input("请输入路径(例如D:\\\\picture)：")
    scaling = float(input("请输入缩放比例:"))
    count = 0
    file_list = os.listdir(path)
    for files in file_list:
        img_dir = os.path.join(path, files)
        img = Image.open(img_dir)
        img_size = img.size
        print("图片宽度和高度分别是{}".format(img_size))
        # if img_size[0] > 2000:
        #     scaling = 0.25
        # elif img_size[0] > 1000:
        #     scaling = 0.5
        # else:
        #     scaling = 1
        img = img.resize((int(img_size[0]*scaling), int(img_size[1]*scaling)))
        img.save(img_dir)
        count += 1
    print("一共修改了"+str(count)+"个文件")


resize()