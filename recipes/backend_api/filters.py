import django_filters
from .models import Recipe

class RecipeFilter(django_filters.FilterSet):
    category_id = django_filters.NumberFilter(field_name='category__id', lookup_expr='exact')

    class Meta:
        model = Recipe
        fields = ['category_id']