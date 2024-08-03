export function verificationCodeGenerator():string {
    const verificationCode: string = (Math.floor(100000 + Math.random() * 900000)).toString();
    return verificationCode
}