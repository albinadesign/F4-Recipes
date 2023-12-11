# backend_api/urls.py

from django.urls import path, include
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

from .views import DocsView  # Импортируем ваше представление DocsView
from .views import (
    RecipeListCreateView,
    RecipeDetailView,
    CategoryListCreateView,
    CategoryDetailView,
    RecipeByCategoryView,
)

schema_view = get_schema_view(
    openapi.Info(
        title="Recipe API",
        default_version='v1',
        description="Recipe API description",
        license=openapi.License(name="My License"),
    ),
    public=True,
)

urlpatterns = [
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('swagger.json', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('docs/', DocsView.as_view(), name='docs'),  # Используем ваше представление DocsView
    path('recipes/', RecipeListCreateView.as_view(), name='recipe-list-create'),
    path('recipes/<int:pk>/', RecipeDetailView.as_view(), name='recipe-detail'),
    path('categories/', CategoryListCreateView.as_view(), name='category-list-create'),
    path('categories/<int:pk>/', CategoryDetailView.as_view(), name='category-detail'),
    path('recipes-by-category/', RecipeByCategoryView.as_view(), name='recipes-by-category'),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

