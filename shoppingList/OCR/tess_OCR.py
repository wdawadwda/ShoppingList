from types import NoneType

import cv2
import pytesseract
import os
# from igmToText import bill_cutter
from .config import system_conf


def text_from_tesseract_ocr(file_path, rate=150, psm=6, oem=2): # 170

    print("rate ", rate)
    print("psm ", psm)

    img = cv2.imread(file_path)
    if type(img) is NoneType:
        return ""
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    ret, thresh = cv2.threshold(gray, rate, rate+1, cv2.THRESH_BINARY)

# Tesseract OCR settings
    match system_conf.system:
        case 'windows':
            # Windows
            pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
            os.environ['TESSDATA_PREFIX'] = 'C:\Program Files\Tesseract-OCR\\tessdata'
            custom_config = fr'--oem {oem} --psm {psm} -l eng+rus'
        case 'ubuntu':
            # Ubuntu
            pytesseract.pytesseract.tesseract_cmd = '/usr/bin/tesseract'
            os.environ['TESSDATA_PREFIX'] = '/usr/bin/tesseract/tessdata'
            custom_config = fr'--oem {oem} --psm {psm} -l eng+rus --tessdata-dir "/usr/share/tesseract-ocr/4.00/tessdata/"'

    raw_text = pytesseract.image_to_string(thresh, config=custom_config)
    return raw_text

if __name__ == "__main__":
    for i in range(0, 7):
        products_list, text, raw_text = text_from_tesseract_ocr(f"../media/pictures/bill{i}.jpg")
        [print(f"{i}\n") for i in products_list[1:]]
        pass
