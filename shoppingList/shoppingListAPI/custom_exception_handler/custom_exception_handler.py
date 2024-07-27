from rest_framework.views import exception_handler
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.exceptions import InvalidToken
from translate import Translator
from shoppingListAPI.custom_exception_handler.custom_exceptions import custom_exceptions

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)
    custom_response_data = {
        'error': True,
        'detail': {
            'ru': {},
            'en': {}
        }
    }
    if response is not None:
        if isinstance(exc, ValidationError) or isinstance(exc, InvalidToken):
            for key, value in exc.detail.items():
                if isinstance(value, list):
                    if isinstance(value[0], str):
                        custom_response_data['detail']['en'][key] = value[0]
                        custom_response_data['detail']['ru'][key] = translate_text(value[0]) if value[0] not in custom_exceptions else custom_exceptions[value[0]]
                    else:
                        custom_response_data['detail']['ru'][key] = value
                        custom_response_data['detail']['en'][key] = value
                elif isinstance(value, str):
                    custom_response_data['detail']['ru'][key] = translate_text(str(value)) if value not in custom_exceptions else custom_exceptions[value]
                    custom_response_data['detail']['en'][key] = str(value)
                else:
                    custom_response_data['detail']['ru'][key] = exc
                    custom_response_data['detail']['en'][key] = exc

            response.data = custom_response_data
        else:
            custom_response_data['detail']['ru'] = translate_text(str(exc)) if str(exc) not in custom_exceptions else custom_exceptions[str(exc)]
            custom_response_data['detail']['en'] = str(exc)
            response.data = custom_response_data
    return response

def translate_text(text, target_language='ru'):
    translator = Translator(to_lang=target_language)
    if isinstance(text, str):
        try:
            return translator.translate(text)
        except:
            return text
    return text


