import React from "react"
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom'
import { NavBar, Toast } from 'antd-mobile';
import styles from "./index.module.css";
import { login } from "../../api/login.js";
import { setToken } from "../../utils/localstorage/token.js";
import { withFormik } from 'formik';

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
                    {errors.username && touched.username && <div id="feedback">{errors.username}</div>}
                    <input 
                        name="password" 
                        type="password" 
                        value={values.password} 
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={styles.password}
                    ></input>
                    {errors.password && touched.password && <div id="feedback">{errors.password}</div>}
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
const MyEnhancedForm = withFormik({
    mapPropsToValues: () => {
        return { username: 'test2', password: 'test2' }
    },

    // Custom sync validation
    validate: values => {
        const errors = {};

        if (!values.username) {
            errors.username = 'Requiredusername';
        }
        if (!values.password) {
            errors.password = 'Requiredpassword';
        }

        return errors;
    },
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
            formikBag.props.history.push("/")
        } else {
            Toast.info(data.description, 2, null, false)
        }
    },

    displayName: 'BasicForm',
})(Login);

export default withRouter(MyEnhancedForm)