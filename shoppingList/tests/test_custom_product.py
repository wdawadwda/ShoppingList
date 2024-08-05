import requests
import json_request_objects

class CreateCustomProduct:
    def create_new_custom_product_new_ru_en_name(self, data=None, func_name=None):
        url = "http://127.0.0.1:8000/api/v1/custom-product/"
        data = json_request_objects.create_data if not data else data
        func_name=func_name if func_name else "create_new_custom_product_new_ru_en_name"
        response = requests.post(
            url=url,
            json=data
        )
        response_data = response.json()
        if response.status_code != 201:
            return print(f"\033[91m{func_name} {response.status_code}\n{response_data}\n\033[0m{data}\n")

        print(f"\033[92m{func_name} SUCCESS\n\033[0m")
        return response_data['id']

    def create_same_product(self):
        if self.create_new_custom_product_new_ru_en_name(func_name="create_same_product"):
            return id

    def create_product_same_ru_name(self):
        if self.create_new_custom_product_new_ru_en_name(data=create_same_ru_data, func_name="create_product_same_ru_name"):
            return id


    def create_product_same_en_name(self):
        if self.create_new_custom_product_new_ru_en_name(data=create_same_en_data, func_name="create_product_same_en_name"):
            return id


    def delete_custom_product(self, id):
        if not id:
            return print(f"\n\033[91mdelete_custom_product id not found\033[0m\n")

        url = f"http://127.0.0.1:8000/api/v1/custom-product/{id}/?user=1"
        response = requests.delete(url)
        if response.status_code != 204:
            return print(f"\n\033[91mdelete_custom_product {response.status_code}\n{response.json()}\033[0m")
        print("\033[92mdelete_custom_product SUCCESS\n\033[0m")

class UpdatePUT:
    pass

if __name__ == "__main__":
    ccp = CreateCustomProduct()
    id = ccp.create_new_custom_product_new_ru_en_name()
    ccp.create_same_product()
    ccp.create_product_same_ru_name()
    ccp.create_product_same_en_name()
    ccp.delete_custom_product(id)