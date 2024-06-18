import cv2
import pytesseract

# from igmToText import bill_cutter


def text_from_tesseract_ocr(file_path, rate=150): # 170
    print("rate ", rate)
    img = cv2.imread(file_path)
    # if img:
    #     pass
    if img.size == 0:
        pass
    else:
        pass
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    ret, thresh = cv2.threshold(gray, rate, rate+1, cv2.THRESH_BINARY)

    pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
    custom_config = r'--oem 2 --psm 6 -l rus'
    raw_text = pytesseract.image_to_string(thresh, config=custom_config)

    # bill_machine = bill_cutter.Cutter()
    # products_list, text = bill_machine.cut_bill(raw_text)
    # products_list, bill_products = bill_machine.get_products_dict(products_list, file_path)

    return raw_text

if __name__ == "__main__":
    for i in range(0, 7):
        products_list, text, raw_text = text_from_tesseract_ocr(f"../media/pictures/bill{i}.jpg")
        [print(f"{i}\n") for i in products_list[1:]]
        pass
