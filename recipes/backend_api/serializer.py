from rest_framework import serializers
from .models import Recipe, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class RecipeSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Recipe
        fields = '__all__'

    def create(self, validated_data):
        category_data = validated_data.pop('category')
        category_instance, _ = Category.objects.get_or_create(**category_data)
        validated_data['category'] = category_instance
        return super(RecipeSerializer, self).create(validated_data)