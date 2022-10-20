import React from "react";
import {Link} from "react-router-dom";
import {FaGithub, FaLinkedin} from "react-icons/fa"
import "./Landing.css";

export const Landing = () => {
  return (
    <div className="conteiner-l">
        <h1 className="nombre">Created by Lucas Ruiz</h1>
        <div className='boton_linkedin'>
                <a href='https://www.linkedin.com/in/lucas-ruiz-68249224b/' rel="noreferrer" target="_blank">
                <FaLinkedin/> 
                </a>
            </div>
            <div className='boton_git'>
                <a href='https://github.com/spawn22' rel="noreferrer" target="_blank">
                <FaGithub/> 
                </a>
            </div>
        <Link to="/home">
            <button className="btn-entrar">Acceso</button>
        </Link>
    </div>
  )
}

export default Landing;