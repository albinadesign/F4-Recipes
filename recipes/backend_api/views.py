from django.shortcuts import render

from rest_framework import generics, permissions
from django_filters.rest_framework import DjangoFilterBackend
from django.http import JsonResponse
from .models import *
from .serializer import *
from .filters import RecipeFilter

from django.views.generic import TemplateView

class DocsView(TemplateView):
    template_name = 'swagger.html'

# to see all the receipts and to create a new one
class RecipeListCreateView(generics.ListCreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_permissions(self):
        if self.request.method == 'POST':
            self.permission_classes = [permissions.IsAdminUser]
        return super().get_permissions()

# To see one receipt, to update or delete one receipt
class RecipeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            self.permission_classes = [permissions.IsAdminUser]
        return super().get_permissions()

# To see the list of categories and creating new ones
class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_permissions(self):
        if self.request.method == 'POST':
            self.permission_classes = [permissions.IsAdminUser]
        return super().get_permissions()

# to see one category, update or delete it
class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            self.permission_classes = [permissions.IsAdminUser]
        return super().get_permissions()

# Представление для просмотра всех рецептов в определенной категории
class RecipeByCategoryView(generics.ListAPIView):
    serializer_class = RecipeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_class = RecipeFilter

    def get_queryset(self):
        category_id = self.request.query_params.get('category_id')
        print('Category ID:', category_id)

        if category_id:
            queryset = Recipe.objects.filter(category=category_id)
            print('Filtered Recipes:', queryset)
            return queryset

        queryset = Recipe.objects.all()
        print('All Recipes:', queryset)
        return queryset
