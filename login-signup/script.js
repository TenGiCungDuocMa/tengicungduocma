{
    //code to show/hide password (start code)

    let isShow = 'bx-show';
    let isHide = 'bx-hide';
  
    let showPass = document.querySelectorAll('.bx-hide');
    
    let usernameValue = '';
    let emailValue = '';
    let passValue = '';
    let pass2Value = '';

    const getUsernameValue = () => {
        return usernameValue;
    }
    const getEmailValue = () => {
        return emailValue;
    }
    const getPassValue = () => {
        return passValue;
    }
    const getPass2Value = () => {
        return pass2Value;
    }
    for (const show of showPass) {
      
        show.onclick = (e) => {
            
          isInInput = true;
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

    //code to show/hide password (end code)


    // Form validation (start code)
   
    let error = 'error';
    let success = 'success';

    let username = document.querySelector('#username');
    let email = document.querySelector('#email');
    let pass = document.querySelector('#password');
    let pass2 = document.querySelector('#password2');

   

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
                child.innerHTML = 'Mật khẩu phải có độ dài trên 8'
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
                child.innerHTML = 'Email không hợp lệ'
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
    
    //username
    username.onblur = (e) => {
        usernameValue = e.target.value.trim();
        isRequired(username, username.value.trim());
    }
    username.onfocus = (e) => {
        isFocus(username);
    }
    
    //email
    email.onblur = (e) => {
        emailValue = e.target.value.trim();
        isRequired(email, email.value.trim()) && isEmail(email, email.value.trim())
    }
    email.onfocus = (e) => {
        isFocus(email)
    }
    
    //pass
    pass.onblur = (e) => {
        passValue = e.target.value.trim();
          isRequired(pass, pass.value.trim()) && isTruePassLength(pass, pass.value.trim())
    }
    pass.oninput = (e) => {
        if (pass2.value.trim()) {   
            isTruePass(pass2, pass.value.trim()); 
        }
    }
    pass.onfocus = (e) => {
        isFocus(pass)
    }

    //pass2
    pass2.onblur = (e) => {
        pass2Value = e.target.value.trim();
        isRequired(pass2, pass2.value.trim()) && isTruePass(pass2, pass.value.trim());  
    }
    pass2.onfocus = (e) => {
        isFocus(pass2)
    }
    
    const rules = [
        {
            rule: [
                isRequired,
                {
                    element: username,
                    value:  getUsernameValue
                },
                {
                    element: email,
                    value:  getEmailValue
                },
                {
                    element: pass,
                    value:  getPassValue
                },
                {
                    element: pass2,
                    value:  getPass2Value
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
        },
        {
            rule: [
                isTruePass,
                {
                    element: pass2,
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
    
    // Form validation (end code)
}