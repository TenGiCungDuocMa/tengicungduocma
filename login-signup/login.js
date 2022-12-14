{
    //code show/hide password (start code)

    let isShow = 'bx-show';
    let isHide = 'bx-hide';

    let showPass = document.querySelectorAll('.bx-hide');

    let emailValue = '';
    let passValue = '';

    const getEmailValue = () => {
        return emailValue;
    }
    const getPassValue = () => {
        return passValue;
    }

    for (const show of showPass) {  
        show.onclick = (e) => {
            if (show.className.includes(isHide)) {
                show.classList.replace(isHide, isShow);
                for (const child of show.parentElement.children) {
                    if (child.tagName === 'INPUT') {
                        child.type = 'text';
                        
                    }
                }
            } else if (show.className.includes(isShow)) {
                show.classList.replace(isShow, isHide)
                for (const child of show.parentElement.children) {
                    if (child.tagName === 'INPUT') {
                        child.type = 'password'
                        
                    }
                }
            }
        }
    }
    
    //code show/hide password (end code)
    
    // Form validation (start code)
    let error = 'error';
    let success = 'success';

    const isFocus = (element) => {
        element.classList.replace(element.classList[0], 'none');
        for (const child of element.parentElement.children) {
               if (child.className === 'message')  {
                child.innerHTML = ''
               }
               if(child.className.includes('eye-icon')) {
                child.style.transform = 'translateY(-50%)'
               }
            }
    }
    
    const isRequired = (element, value) => {
        if (value === '') {
            element.classList.replace(element.classList[0], error);
            for (const child of element.parentElement.children) {
               if (child.className === 'message')  {
                child.innerHTML = 'Please enter this field'
               }
               if(child.className.includes('eye-icon')) {
                child.style.transform = 'translateY(-80%)'
               }
            }
            return false;
        } else {
            element.classList.replace(element.classList[0], success);
            for (const child of element.parentElement.children) {
               if (child.className === 'message')  {
                child.innerHTML = ''
               }
            }
            return true;
        }
    }

    const isTruePassLength = (element, value) => {
        if (value.length < 8) {
            element.classList.replace(element.classList[0], error);
            for (const child of element.parentElement.children) {
               if (child.className === 'message')  {
                child.innerHTML = 'Mật khẩu phải có độ dài hơn 8 kí tự'
               }
               if(child.className.includes('eye-icon')) {
                child.style.transform = 'translateY(-80%)'
               }
            }
            return false;
        } else {
            element.classList.replace(element.classList[0], success);
           
            for (const child of element.parentElement.children) {
               if (child.className === 'message')  {
                child.innerHTML = ''
               }
            }
            
            return true;
        }
    }

    const isEmail = (element, value) => { 
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (regex.test(value)) {
            element.classList.replace(element.classList[0], success);
            for (const child of element.parentElement.children) {
               if (child.className === 'message')  {
                child.innerHTML = ''
               }
            }
            return true;
        } else {
            element.classList.replace(element.classList[0], error);
            
            for (const child of element.parentElement.children) {
               if (child.className === 'message')  {
                child.innerHTML = 'Email không hợp hệ'
               }
               if(child.className.includes('eye-icon')) {
                child.style.transform = 'translateY(-80%)'
               }
            }
            return false;
        }
    }

    const isTruePass = (element, value) => {
        if (element.value.trim() !== value || element.value.trim() === '') {
            element.classList.replace(element.classList[0], error);
            for (const child of element.parentElement.children) {
               if (child.className === 'message')  {
                child.innerHTML = 'Mật khẩu không khớp'
               }
               if(child.className.includes('eye-icon')) {
                child.style.transform = 'translateY(-80%)'
               }
            }
            return false;
        } else {
            element.classList.replace(element.classList[0], success);
            
            for (const child of element.parentElement.children) {
               if (child.className === 'message')  {
                child.innerHTML = ''
               }
            }
            return true;
        }
    }

    //email
    let email = document.querySelector('#email');
    email.onblur = (e) => {
        emailValue = e.target.value.trim();
        isRequired(email, email.value.trim()) && isEmail(email, email.value.trim())
    }
    email.onfocus = (e) => {
        isFocus(email)
    }

    //pass
    let pass = document.querySelector('#password');
    pass.onblur = (e) => {
        passValue = e.target.value.trim();
        isRequired(pass, pass.value.trim()) && isTruePassLength(pass, pass.value.trim()) 
    }
    pass.onfocus = (e) => {
        isFocus(pass)
    }

    const rules = [
        {
            rule: [
                isRequired,
                {
                    element: email,
                    value:  getEmailValue
                },
                {
                    element: pass,
                    value:  getPassValue
                }
                
            ]
        },
        {
            rule: [
                isEmail,
                {
                    element: email,
                    value:  getEmailValue
                }
            ]
        },
        {
            rule: [
                isTruePassLength,
                {
                    element: pass,
                    value:  getPassValue
                }
            ]
        } 
    ]

    // submit button
    let submitBtn = document.querySelector('#submit');
    submitBtn.onclick = (e) => {
        e.preventDefault()
        const ignore = [];
        let submitSuccess = true;
        for (const rl of rules) {
            for (let i=1; i<rl.rule.length; i++) {
                if (ignore.includes(rl.rule[i].element)) continue;
                if (!(rl.rule[0](rl.rule[i].element,  rl.rule[i].value()))) {
                    submitSuccess = false;
                    ignore.push(rl.rule[i].element);
                }
            }
        }
        if (submitSuccess) {
            // Đoạn này dùng để call API để lưu dữ diệu hoặc làm gì khác nếu các dữ liệu trong form là hợp lệ
            alert('Tài khoản đã được đăng kí');
        } else {
            // Đoạn này xử lí ngoại lệ
        }    
    }

    // Form validation (end)
}
