import React, { useState, useEffect } from 'react';
import './App.css';
import Transpiler from './transpiler/Transpiler';

function App() {

	const [entryCode, setEntryCode] = useState('')
	const [transpiledCode, setTrasnspiledCode] = useState('')

	useEffect(() => {
		document.title = "Transpilador de Linguagens"
	}, []);

	function transpile(){
		try{
			setTrasnspiledCode(new Transpiler(entryCode).transpile())
		}catch(e){
			alert(e.message)
		}
	}

	return (
		<div className='app'>
			<div className='card'>
				<div className='header'>
					<h1>Transpilador de linguagens</h1>
				</div>
				<div className='content-grid'>
					<div className='input entry'>
						<label>Entrada</label>
						<textarea value={entryCode} onChange={e => setEntryCode(e.target.value)} />
					</div>
					<div className='transpile'>
						{<button onClick={e => transpile()}><h1>{'>>'}</h1></button>}
					</div>
					<div className='input entry'>
						<label>Saída</label>
						<textarea value={transpiledCode} readOnly={true} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
