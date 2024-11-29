from django.urls import path
from . import views

urlpatterns = [
    path("people/", views.get_people, name="people"),
    path("people/following/", views.get_following, name="get_following"),
    path("people/feed/", views.get_feed, name="get_feed"),
    path("people/followers/", views.get_followers, name="get_followers"),
    path(
        "people/search/<str:query>/",
        views.search_person,
        name="search_person",
    ),
    path(
        "people/<str:username>/visit/",
        views.visit_person,
        name="visit_person",
    ),
    path(
        "people/interact/<str:username>/<str:interaction>/",
        views.interact_with_person,
        name="interact_with_person",
    ),
    path(
        "people/share/<str:content_type>/<int:id>/",
        views.share_content,
        name="share_content",
    ),
]
