import { useState } from 'react';

function Contador() {
  const [contador, setContador] = useState(0);

  return (
    <div className='contador'>
      <p> Contador: {contador}</p>
      <button className='boton' onClick={() => setContador(contador + 1)}>
          PRESIONA AQUI
      </button>
    </div>
  );
}

export default Contador;
