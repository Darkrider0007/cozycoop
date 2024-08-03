interface VerifyAccountProps {
    name: string;
    verificationCode: string;
}

export const verifyAccountSyntax = ({ name, verificationCode }: VerifyAccountProps): string => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Account Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                background-color: #f4f4f9;
                color: #333;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background: #fff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                margin-bottom: 20px;
            }
            .header img {
                max-width: 150px;
                margin-bottom: 10px;
            }
            .content {
                margin-bottom: 20px;
            }           
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">                
                <h1>Hello ${name}</h1>
            </div>
            <div class="content">
                <p>Thanks for joining CozyCoop. Please verify your account with this code: <strong>${verificationCode}</strong></p>
            </div>            
        </div>
    </body>
    </html>
    `;
};
