const FormularioLogin = ({ onSubmit, onChange, valueEmail, valuePassword }) => {
    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="email">Email</label>
            <input 
                type="email"
                name="email" 
                value={valueEmail}
                onChange={onChange}
                required 
            />
            <label htmlFor="password">Senha</label>
            <input 
                type="password" 
                name="password" 
                value={valuePassword}
                onChange={onChange}
                required 
            />
            <button type="submit">Entrar</button>
        </form>
    )
}

export default FormularioLogin