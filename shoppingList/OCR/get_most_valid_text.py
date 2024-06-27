import re
from datetime import datetime
from OCR.tess_OCR import text_from_tesseract_ocr

def print_result(results):
    amount = {}
    for key in results:
        amount[key] = {}
        ru, en, numbers, incorrect = count_alpha(text=results[key])
        amount[key] = {"ru": ru, "en": en, "num": numbers, "incorrect": incorrect}
        print(f"rate: {key}, ru: {ru}, en: {en}, incorrect: {incorrect}")
        print(results[key])
    return amount

def count_alpha(text):
    ru_pattern = r"[а-яА-Я]{4,}"
    en_pattern = r"[a-zA-Z]{4,}"
    incorrect_symbols_pattern = r"[°…\‹›Ё@|]{2,}"
    num_pattern = r"[0-9.,]{2,}"
    return len(re.findall(ru_pattern, text)), len(re.findall(en_pattern, text)), len(re.findall(num_pattern, text)), len(re.findall(incorrect_symbols_pattern, text))

def choose_most_valid_text(amount:dict):
    ru_list, en_list, num_list, incorrect_list = [], [], [], []
    for key, value in amount.items():
        ru_list.append(value['ru'])
        en_list.append(value['en'])
        num_list.append(value['num'])
        incorrect_list.append(value['incorrect'])
    if sum(ru_list) > sum(en_list):
        max_el = max(ru_list)
        max_el_index = ru_list.index(max_el)
        valid_amount_key = list(amount.keys())[max_el_index]
        return valid_amount_key

def text_recognize(file_path):
    results = {}

    start_time = datetime.now()
    print(start_time.strftime("%M:%S"))
    for rate in [80, 100, 130]:
        try:
            result = text_from_tesseract_ocr(file_path, rate=rate)
            results[rate] = result
        except Exception as ex:
            print(f"rate: {rate}: {ex}")
        pass_time = datetime.now()
        print(pass_time.strftime("%M:%S"))

    amount = print_result(results=results)
    most_valid_key = choose_most_valid_text(amount)
    return results[most_valid_key]

if __name__ == '__main__':
    text = text_recognize()
    # text = text_recognize(pic_path="./shoppingList/referecces/bill_18-41.jpg")
    print(text)