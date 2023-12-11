Создайте фуллстек-приложение с рецептами блюд, которое будет использовать Django Rest Framework, автодокументацию OpenAPI+Swagger и react-router.

Давать пользователю возможность создавать рецепты не нужно: достаточно распределить их по категориям и отображать в клиенте и в API.

Где отображать документацию API — решать вам.

У каждого блюда и каждой категории должна быть своя страница: с главной страницы можно перейти на любую из категорий, а из категории — на любой рецепт этой категории.


Загрузить проект:

окрываем новый проект в IDE

в терминале git clone https://github.com/albinadesign/F4-Recipes.git

cd F4-Recipes

python3 -m venv venv или python -m venv venv (1  - для Mac, 2 - для Windows)

source venv/bin/activate 

pip install -r requirements.txt

Если django_filters не устанавливается, то 
pip install git+https://github.com/carltongibson/django-filter.git

cd recipes

Запустить в одном терминале: python manage.py runserver 

и в другом терминале cd F4-Recipes
cd recipes
cd frontend
npm i
npm start

Запускается проект по адресу http://localhost:3000/
<img width="1675" alt="image" src="https://github.com/albinadesign/F4-Recipes/assets/117900508/32e36483-ce62-4b2a-96a0-a805699e3a22">

Можно выбрать категорию
<img width="1665" alt="image" src="https://github.com/albinadesign/F4-Recipes/assets/117900508/7e410f7a-e832-49b6-95e5-2bb780b2eca3">

Переходим на страницу категории
<img width="1663" alt="image" src="https://github.com/albinadesign/F4-Recipes/assets/117900508/5bdd9bba-dc1b-45ea-abdd-17bae00eeb1d">

Щелкаем на рецепт, переходим на страницу рецепта 
<img width="1557" alt="image" src="https://github.com/albinadesign/F4-Recipes/assets/117900508/763a0b59-782c-4ebb-af98-bd4716c08a60">
<img width="1463" alt="image" src="https://github.com/albinadesign/F4-Recipes/assets/117900508/d52df99e-9608-432d-b01f-3cb3e1556df7">

Оттуда же можно вернуться на главную страницу или посмотреть все рецепты данной категории

Теперь API
Вносить новые рецепты и менять старые может только admin

По адресу http://localhost:8000/api/swagger/ видим Swagger
<img width="1658" alt="image" src="https://github.com/albinadesign/F4-Recipes/assets/117900508/b82a66ad-c800-462e-b36c-2d08a939a648">
<img width="1561" alt="image" src="https://github.com/albinadesign/F4-Recipes/assets/117900508/3d90d53b-8f31-4bfc-b6d9-fafce63f289f">

По ссылке http://localhost:8000/api/swagger.json скачивается файл документации:

swagger: '2.0'
info:
  title: Recipe API
  description: Recipe API description
  license:
    name: My License
  version: v1
host: localhost:8000
schemes:
- http
basePath: /api
consumes:
- application/json
produces:
- application/json
securityDefinitions:
  Basic:
    type: basic
security:
- Basic: []
paths:
  /categories/:
    get:
      operationId: categories_list
      description: ''
      parameters: []
      responses:
        '200':
          description: ''
          schema:
            type: array
            items:
              $ref: '#/definitions/Category'
      tags:
      - categories
    post:
      operationId: categories_create
      description: ''
      parameters:
      - name: data
        in: body
        required: true
        schema:
          $ref: '#/definitions/Category'
      responses:
        '201':
          description: ''
          schema:
            $ref: '#/definitions/Category'
      tags:
      - categories
    parameters: []
  /categories/{id}/:
    get:
      operationId: categories_read
      description: ''
      parameters: []
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/Category'
      tags:
      - categories
    put:
      operationId: categories_update
      description: ''
      parameters:
      - name: data
        in: body
        required: true
        schema:
          $ref: '#/definitions/Category'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/Category'
      tags:
      - categories
    patch:
      operationId: categories_partial_update
      description: ''
      parameters:
      - name: data
        in: body
        required: true
        schema:
          $ref: '#/definitions/Category'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/Category'
      tags:
      - categories
    delete:
      operationId: categories_delete
      description: ''
      parameters: []
      responses:
        '204':
          description: ''
      tags:
      - categories
    parameters:
    - name: id
      in: path
      description: A unique integer value identifying this category.
      required: true
      type: integer
  /recipes-by-category/:
    get:
      operationId: recipes-by-category_list
      description: ''
      parameters:
      - name: category_id
        in: query
        description: category_id
        required: false
        type: string
      responses:
        '200':
          description: ''
          schema:
            type: array
            items:
              $ref: '#/definitions/Recipe'
      tags:
      - recipes-by-category
    parameters: []
  /recipes/:
    get:
      operationId: recipes_list
      description: ''
      parameters: []
      responses:
        '200':
          description: ''
          schema:
            type: array
            items:
              $ref: '#/definitions/Recipe'
      tags:
      - recipes
    post:
      operationId: recipes_create
      description: ''
      parameters:
      - name: data
        in: body
        required: true
        schema:
          $ref: '#/definitions/Recipe'
      responses:
        '201':
          description: ''
          schema:
            $ref: '#/definitions/Recipe'
      tags:
      - recipes
    parameters: []
  /recipes/{id}/:
    get:
      operationId: recipes_read
      description: ''
      parameters: []
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/Recipe'
      tags:
      - recipes
    put:
      operationId: recipes_update
      description: ''
      parameters:
      - name: data
        in: body
        required: true
        schema:
          $ref: '#/definitions/Recipe'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/Recipe'
      tags:
      - recipes
    patch:
      operationId: recipes_partial_update
      description: ''
      parameters:
      - name: data
        in: body
        required: true
        schema:
          $ref: '#/definitions/Recipe'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/Recipe'
      tags:
      - recipes
    delete:
      operationId: recipes_delete
      description: ''
      parameters: []
      responses:
        '204':
          description: ''
      tags:
      - recipes
    parameters:
    - name: id
      in: path
      description: A unique integer value identifying this recipe.
      required: true
      type: integer
definitions:
  Category:
    required:
    - name
    type: object
    properties:
      id:
        title: ID
        type: integer
        readOnly: true
      name:
        title: Name
        type: string
        maxLength: 50
        minLength: 1
  Recipe:
    required:
    - category
    - title
    - description
    type: object
    properties:
      id:
        title: ID
        type: integer
        readOnly: true
      category:
        $ref: '#/definitions/Category'
      title:
        title: Title
        type: string
        maxLength: 100
        minLength: 1
      description:
        title: Description
        type: string
        minLength: 1
      image:
        title: Image
        type: string
        readOnly: true
        format: uri






