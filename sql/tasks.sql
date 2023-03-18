CREATE DATABASE tasks_app;

CREATE TABLE tasks(
    id VARCHAR(20) PRIMARY KEY NOT NULL,
    task_description VARCHAR(124) NOT NULL,
    completion_date TIMESTAMP WITH TIME ZONE NOT NULL,
    completed BOOLEAN
);