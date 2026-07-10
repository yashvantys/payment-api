import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Payment API",
            version: "1.0.0",
            description: "RESTful Payment API built with Express, TypeScript, Prisma and PostgreSQL."
        },
        contact: {
            name: "Yashvant Yadav",
            email: "yashvant@gmail.com"
        },
        servers: [
            {
                url: "http://localhost:3000/api/v1",
            },
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },

            schemas: {
                Payment: {
                    type: "object",
                    required: [
                        "paymentId",
                        "amount",
                        "payerName",
                        "payerEmail",
                        "paymentMethod",
                    ],
                    properties: {
                        paymentId: {
                            type: "string",
                            example: "PAY001",
                        },
                        amount: {
                            type: "number",
                            example: 1000.5,
                        },
                        currency: {
                            type: "string",
                            example: "INR",
                        },
                        payerName: {
                            type: "string",
                            example: "Yashvant Yadav",
                        },
                        status: {
                            type: "string",
                            enum: ["PENDING", "SUCCESS", "FAILED", "REFUNDED"]
                        },
                        payerEmail: {
                            type: "string",
                            example: "yashvant@gmail.com",
                        },
                        paymentMethod: {
                            type: "string",
                            enum: ["CARD", "UPI", "NET_BANKING", "WALLET"],
                        },
                    },
                },

                UserLogin: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        email: {
                            type: "string",
                            example: "admin@gmail.com",
                        },
                        password: {
                            type: "string",
                            example: "Password@123",
                        },
                    },
                },

                UserRegister: {
                    type: "object",
                    required: ["firstName", "lastName", "email", "password"],
                    properties: {
                        firstName: {
                            type: "string",
                            example: "Yashvant",
                        },
                        lastName: {
                            type: "string",
                            example: "Yadav",
                        },
                        email: {
                            type: "string",
                            example: "yashvant@gmail.com",
                        },
                        password: {
                            type: "string",
                            example: "Password@123",
                        },
                        role: {
                            type: "string",
                            example: "USER",
                        },
                    },
                },
            },
        },
    },

    apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;