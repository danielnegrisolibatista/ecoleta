import React from 'react';

// definição da tipagem do objeto
interface HeaderProps {
  title: string;
}

// React.FC - define a variável Header, FC = Function Component (componente escrito em formato de função)
const Header: React.FC<HeaderProps> = (props) => {
  return (
    <header>
      <h1>{props.title}</h1>
    </header>
  );
}

export default Header;