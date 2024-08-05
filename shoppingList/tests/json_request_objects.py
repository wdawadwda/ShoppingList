create_data = {
    "category": {
        "en": "milk",
        "ru": "молоко"
    },
    "isPushed": False,
    "name": {
        "en": "milk 1.8",
        "ru": "молоко 1.8"
    },
    "quantity": "",
    "svgKey": "",
    "user": 1
}



create_same_ru_data = create_data.copy()
create_same_ru_data['name']['en'] = 'test'

create_same_en_data = create_data.copy()
create_same_en_data['name']['ru'] = 'test'
