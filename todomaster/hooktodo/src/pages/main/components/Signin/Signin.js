import BasicButton from '@components/Button/Button';
import useInputs from '@hooks/use-inputs';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import * as S from '../../style';
const SignInForm = ()=>{
    const [{email, password},onChangeForm] = useInputs({
        email: '',
        password : ''
      })

    // const emailRef = useRef(null);
    // const passwordRef = useRef(null); 

    // signInHandler();
    // function signInHandler(){
    //     let emailchk=false;
    //     let passwordchk=false;
    //     let getEmail = RegExp(/^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/);
    //     if(emailRef.current){
    //         if(!getEmail.test(emailRef.current.value)){
    //         emailRef.current.style.borderColor=theme.PALETTE.error;
    //         }else{
    //             emailRef.current.style.borderColor=theme.PALETTE.primary[300];
    //             emailchk=true;
    //         }
    //     }

    //     if(passwordRef.current){
    //         if(passwordRef.current.value===""){
    //             passwordRef.current.style.borderColor=theme.PALETTE.error;
    //         }else{
    //             passwordRef.current.style.borderColor=theme.PALETTE.primary[300];
    //             passwordchk=true;
    //         }
    //     }
    //     if(passwordchk && emailchk){
    //         return false;
    //     }  
        
    //     return true;
    // };


    const navigation = useNavigate();
    const onPressSignIn = (e) => {
        e.preventDefault();
        // console.log(emailRef.current.value,passwordRef.current.value);
        console.log(e.target.email.value, e.target.password.value); 
        const email = e.target.email.value;
        const password = e.target.password.value;
        Axios.post("http://localhost:3030/user/sign-in",
        { email : email, password : password},
        {withCredentials:true}
        )
        .then((response)=>{
        if(response.data.token){
            alert("로그인이 되었습니다.");
            console.log()
            return navigation('/todo/1',{
                state:{
                    email,
                    password
                }
            })
        }})
        .catch((err)=>{
            if(err.response.status===400){
                alert("잘못입력하셨습니다.")
            }
        })
    };  
    
    return (
        <S.Form onSubmit={onPressSignIn}>
            <S.InputBox>
                <label>
                    이메일
                </label> 
                <input 
                    // ref={emailRef} 
                    onChange={onChangeForm} 
                    // type="email" 
                    name="email"
                />
            </S.InputBox>

            <S.InputBox>
                <label>
                    비밀번호
                </label>
                <input
                    // ref={passwordRef}
                    onChange={onChangeForm}
                    type="password"
                    name="password"
                    value={password} 
                />
            </S.InputBox>

            <BasicButton 
                size={"full"} 
                shape={"default"} 
                variant={"primary"}
                // disabled={signInHandler()}
            >
                로그인
            </BasicButton>
        </S.Form>
    )
}
export default SignInForm
