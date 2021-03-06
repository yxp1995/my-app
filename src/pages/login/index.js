import React from "react"
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom'
import { NavBar, Toast } from 'antd-mobile';
import styles from "./index.module.css";
import { login } from "../../api/login.js";
import { setToken } from "../../utils/localstorage/token.js";
import { withFormik } from 'formik';
import * as Yup from 'yup';

class Login extends React.PureComponent {
    render() {
        const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
        } = this.props;
        return (
            <>
                <NavBar className={styles.navHeader}>账号登录</NavBar>
                <form onSubmit={handleSubmit}>
                    <input
                        name="username"
                        type="text"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={styles.userName}
                    ></input>
                    {errors.username && touched.username && <div id={styles.feedback}>{errors.username}</div>}
                    <input 
                        name="password" 
                        type="password" 
                        value={values.password} 
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={styles.password}
                    ></input>
                    {errors.password && touched.password && <div id={styles.feedback}>{errors.password}</div>}
                    <div className={styles.btn}>
                        <button className={styles.submit} type="submit">登录</button>
                        <div className={styles.link}>
                            还没有账号, <Link to="/">去注册</Link>
                        </div>
                    </div>
                </form>
            </>
        )
    }
}
// withFormik: 高阶组件,表单验证
const MyEnhancedForm = withFormik({
    mapPropsToValues: () => {
        return { username: 'test2', password: 'test2' }
    },

    // Custom sync validation
    // validate: values => {
    //     const errors = {};

    //     if (!values.username) {
    //         errors.username = 'Requiredusername';
    //     }
    //     if (!values.password) {
    //         errors.password = 'Requiredpassword';
    //     }

    //     return errors;
    // },
    validationSchema: () => SignupSchema,
    handleSubmit: async(values, formikBag) => {
        console.log(formikBag,'----')
        const { username, password } = values
        const formData = {
            username: username,
            password: password
        }
        const { data } = await login(formData)
        if (data.status === 200) {
            setToken(data.body.token)
            Toast.success(data.description, 2, null, false)
            formikBag.props.history.push("/Home/rent")
        } else {
            Toast.info(data.description, 2, null, false)
        }
    },

    displayName: 'BasicForm',
})(Login);
// 验证规则->使用了yup包->在formik文档中有介绍
const SignupSchema = Yup.object().shape({
    username: Yup.string().min(2,'最小长度为2!')
    .max(8,'最大长度为8!').required('必填项!'),
    password: Yup.string().min(2,'最小长度为2!')
    .max(8,'最大长度为8!').required('必填项!')
})

export default withRouter(MyEnhancedForm)