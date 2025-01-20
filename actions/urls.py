from django.urls import path
from . import views

# actions/ongoing # GET
# actions/automated/ # GET
# actions/pending/ # GET
# actions/new/ # GET
# actions/<int:id>/ # GET
# actions/<int:id>/save/ # PUT
# actions/<int:id>/delete/ # PUT
# actions/<int:id>/complete/ # PUT
# actions/<int:id>/fail/ # PUT (?)
# actions/<int:id>/automate/ # PUT


urlpatterns = [
    path("fill/", views.fill_database, name="fill"),
    path("actions/<int:id>/", views.get_action, name="action"),
    path("actions/saved/", views.get_saved_actions, name="user_actions"),
    path("actions/ongoing/", views.get_ongoing_actions, name="ongoing_actions"),
    path("actions/new/", views.get_new_actions, name="new_actions"),
    path("actions/create/", views.create_action, name="create_action"),
    path("actions/automated/", views.get_automated_actions, name="automated_actions"),
    path(
        "actions/<int:id>/<str:interaction>/",
        views.interact_with_action,
        name="interact_with_action",
    ),
]
