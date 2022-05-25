import { validarCPF } from "./cpfFilter";

export default function validateAccountFields(name, email, phone, dob, cpf, password) {
    
    if (name.length < 3) {
        throw new Error('O campo nome deve ter no mínimo 3 caracteres');
    }

    const regexEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (!email || regexEmail.test(email) === false) {
        throw new Error('O e-mail informado não é válido');
    }

    const regexPhone = /^\([1-9]{2}\)[1-9]{0,1}[1-9]{1}[0-9]{3}-[0-9]{4}$/;
    if (!phone || regexPhone.test(phone) === false) {
        throw new Error('Informe o telefone com DDD');
    }
    
    const regexDob = /^(?:0[1-9]|[12]\d|3[01])([/.-])(?:0[1-9]|1[0-2])\1(?:19|20)\d\d$/;
    if (!dob || regexDob.test(dob) === false) {
        throw new Error('Data de nascimento inválida');
    }

    if (!cpf || !validarCPF(cpf)) {
        throw new Error('O CPF informado não é válido');
    }

    if (password.length < 6) {
        throw new Error('A senha deve ter no mínimo 6 caracteres');
    }

    return true;

}