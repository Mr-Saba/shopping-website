import React, {useEffect, useState} from 'react'
import {Button} from "@material-ui/core"
import {useDispatch, useSelector} from "react-redux"
import {SignUpWithEmailAndPassword} from "../../redux/actions"
import {Link} from "react-router-dom"
import './registration.css'
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {useHistory} from "react-router"
import numberNations from "../../data/numberNations.json"
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';


function Registration() {

    useEffect(() => {
        
    }, [])

    const [accepted, setAccepted] = useState(false)

    const {isLoggedIn} = useSelector(state => state)

    const history = useHistory()

    const schema = yup.object().shape({
        firstName: yup.string('Use a valid name')  
                   .max(25, 'Name is too long!')
                   .required('Name field is required*'),
        lastName: yup.string('Use a valid surname')
                   .max(25, 'Surname is too long!')
                   .required('Surname field is required*'),
        email: yup.string()
                   .email('Enter a valid email-adress')
                   .required('email-adress field is required*'),
        password: yup.string()
                   .required('Password field is required*')
                   .min(8, 'Password is too short!')
                   .max(17, 'Password is too long!')
                   .matches(/(?=.*[0-9])/, 'Password must contain some numbers'),
        passwordConfirmation: yup.string()
                   .required('Password confirmation field is required*')
                   .oneOf([yup.ref('password'), null], 'Passwords not match'),
        number: yup.string().nullable().matches(/(^[0-9]*$)/, 'Use a valid number'),
        terms: yup.bool().oneOf([true], "You should accept Terms & Conditions*")
    });

    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema)
      })
    
    const {t} = useTranslation()
    
    const dispatch = useDispatch()

    const EmailAndPasswordRegister = () => {
        const passwordHash = require('password-hash');
        const hashedPassword = passwordHash.generate(document.getElementById("password").value);
        const data = {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            name: document.getElementById("firstname").value,
            surname: document.getElementById("lastname").value,
            nation: document.getElementById("select").value,
            number: document.getElementById("number").value,
            password: document.getElementById("password").value
        }
        console.log(data)
        if(accepted === true) {
            dispatch(SignUpWithEmailAndPassword(data)) 
        }
    }

    const onSubmit = (data) => {
        if(data) {
            history.push("/")
        }
    }

    const handleChange = () => {
        if(document.getElementById("terms").checked) {
            setAccepted(true)
        } else {
            setAccepted(false)
        }
    }

    const [values, setValues] = useState({
        password: "",
        showPassword: false,
      });
    const [ConfirmValues, setConfirmValues] = useState({
        password: "",
        showPassword: false,
      });
    
      const handleChangePassShowHide = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };

      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
      const handleChangeConfirmPassShowHide = (prop) => (event) => {
        setConfirmValues({ ...ConfirmValues, [prop]: event.target.value });
      };

      const handleClickShowConfirmPassword = () => {
        setConfirmValues({ ...ConfirmValues, showPassword: !ConfirmValues.showPassword });
      };


    return (
        <div className="registration">
            <div className="centerReg">
                <h1>{t('SignUp')}</h1>
                <span>{t('AlreadyHaveAnAccount')}?
                <Link to="/logIn" > {t('LogIn')}</Link>
                </span>
                <form className="regForm" onSubmit={handleSubmit(onSubmit)}>
                    <div className="firstLastName">
                            <div className="inputSignUp">
                                <input type="text" placeholder={t('FirstName')} {...register("firstName")} id="firstname"/>
                                {errors.firstName && <p>{errors.firstName?.message}</p> }
                            </div>
                            <div className="inputSignUp">
                                <input type="text" placeholder={t('LastName')} {...register("lastName")} id="lastname"/>
                                {errors.lastName && <p>{errors.lastName?.message}</p> }
                            </div>
                        </div>
                        <div className="inputSignUp">
                            <input type="text" placeholder={t('Email')} {...register("email")} id="email"/>
                            {errors.email && <p>{errors.email?.message}</p> }
                        </div>
                        <div className="inputSignUp">
                            <input 
                            type="password" 
                            placeholder={t('Password')} 
                            {...register("password")} 
                            id="password"
                            type={values.showPassword ? "text" : "password"}
                            value={values.password}
                            onChange={handleChangePassShowHide("password")}
                            />
                            <i
                            onClick={handleClickShowPassword}
                            >
                            {values.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </i>
                            {errors.password && <p>{errors.password?.message}</p> }
                        </div>
                        <div className="inputSignUp">
                            <input 
                            type="password" 
                            placeholder={t('ConfirmPassword')} 
                            {...register("passwordConfirmation")}  
                            id="confirm_password"
                            type={ConfirmValues.showPassword ? "text" : "password"}
                            value={ConfirmValues.password}
                            onChange={handleChangeConfirmPassShowHide("password")}
                            />
                            <i
                            onClick={handleClickShowConfirmPassword}
                            >
                            {ConfirmValues.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </i>
                            {errors.passwordConfirmation && <p>{errors.passwordConfirmation?.message}</p> }
                        </div>
                        <div className="inputPhoneSignUp">
                            <label>
                                <select id="select" defaultValue="+995">
                                    {numberNations.map((item) => (
                                        <option value={item.value}>{item.label}</option>
                                    ))}
                                </select>
                            </label>
                            <input type="text" placeholder={t('Number')} {...register("number")} id="number" />
                            <p>{(errors.number === undefined) ? ('') : (errors.number?.message)}</p>
                        </div>
                        <div className="termsAndConditionsSignUp">
                            <div className="termsAndConditionsCheckBoxSignUp">
                                <label for="terms" style={{width: "225px"}}>
                                    I Accept<Link to="/termsAndConditions"> Terms & Conditions</Link>
                                </label>
                                <input type="checkbox" onClick={handleChange} {...register("terms")} id="terms" name="terms" />
                            </div>
                            {errors.terms && <p>{errors.terms?.message}</p> }
                        </div>
                    <Button type="submit" variant="contained" onClick={EmailAndPasswordRegister}>{t('SignUp')}</Button>
                </form>
            </div>
        </div>
    )
}

export default Registration