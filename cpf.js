// fiquei com preguiça de comentar e explicar tudo.

class validation {
    //limpando os caracteres do cpf.
    constructor(cpfVal) {
        Object.defineProperty(this, 'cleanCpf', {
            writable:false,
            enumerable:true,
            configurable:false,
            value: cpfVal.replace(/\D+/g, '')
        });
    };
    

    //checa se o cpf é uma sequencia.
    isSequence() {
        return this.cleanCpf.charAt(0).repeat(11) === this.cleanCpf;
    }

    cpfGen() {
        const noDigitCpf = this.cleanCpf.slice(0, -2);
        const digit1 = validation.genDig(noDigitCpf);
        const digit2 = validation.genDig(noDigitCpf + digit1);
        this.newCpf = noDigitCpf + digit1 + digit2;
    }
    
    static genDig(noDigitCpf) {
        let total = 0;
        let reverse = noDigitCpf.length + 1;
        for (let strint of noDigitCpf) {
            total+= reverse * Number(strint);
            reverse--;
        }
        const digit = 11 - (total % 11);
        return digit <= 9 ? String(digit) : '0';
        // console.log(total)
    }
    
    // validando o cpf.
    valida() {
        if(!this.cleanCpf) return false;
        if(typeof this.cleanCpf !== 'string') return false;
        if(this.cleanCpf.length !== 11) return false;
        if(this.isSequence()) return false;
        this.cpfGen();
        // console.log(this.newCpf)
        
        
        return this.newCpf === this.cleanCpf;
    }
}

let cleanCpf = new validation('211.246.930-41');
// cleanCpf = new validation('999.999.999-99');
console.log(cleanCpf.valida())
    
if(cleanCpf.valida()) {
    console.log('valid cpf');
} else {
    console.log('invalid cpf')
}