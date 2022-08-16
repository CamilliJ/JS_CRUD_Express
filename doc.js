export const swaggerDocument =
{
    "swagger": "2.0",
    "info": {
        "description": "My Students API description",
        "version": "1.0.0",
        "title": "Students API"
    },
    "host": "localhost:3000",
    "tags": [
        {
            "name": "account",
            "description": "Account management"
        }
    ],
    "paths": {
        "/alunos": {
            "get": {
                "tags": [
                    "account"
                ],
                "summary": "Get existing accounts",
                "description": "Get existing account description",
                "produces": [
                    "application/json"
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Account"
                            }
                        }
                    },
                    "400": {
                        "description": "Error occurred"
                    }
                }
            },
            "post": {
                "tags": [
                    "account"
                ],
                "summary": "Create a new account",
                "description": "Create a new account with the received parameters",
                "consumes": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Account object",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/Alunos"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Account created"
                    },
                    "400": {
                        "description": "Error occurred"
                    }
                }
            }
        }
    },
    "definitions": {
        "Account": {
            "type": "object",
            "properties": {
                "student": {
                    "type": "string",
                    "example": "Camilli J"
                },
                "subject": {
                    "type": "string",
                    "example": "02 - HTML e CSS"
                },
                "type": {
                    "type": "string",
                    "example": "Prova Prática"
                },
                "value": {
                    "type": "integer",
                    "example": 30
                },
                "timestamp": {
                    "type": "string",
                    "example": "11/8/2022 - 9:33h."
                },
            }
        }
    }
};
