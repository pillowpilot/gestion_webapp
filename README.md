# Guaranito Management System

## Dir structure

```
.
├── backend             // Django project
│   ├── config            // Main app (settings.py, etc.)
│   ├── publicapp         // Public views
│   └── tenantapp         // Tenant-only views
├── data                // Backend data
│   └── db
├── frontend            // React project
│   ├── build
│   ├── fake-api
│   ├── node_modules
│   ├── public
│   └── src
└── nginx                // Production web server
    └── default.conf       // Nginx config file
```

## Frontend

Using [this](https://www.creative-tim.com/product/material-dashboard-react) React template.

## Backend

From scratch Django project.

## Local enviroment

Just run `docker-compose build` follow by `docker-compose up`. To run commands, setup a container shell with `docker-compose run <service-name> <command>` where `<service-name>` is the name especified in `docker-compose.yml` and `<command>` is the command to run, ie `python3 manage.py shell` or `sh`.
