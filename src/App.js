import React, { useState, useEffect } from 'react';
import './App.css';
import Transpiler from './transpiler/Transpiler';

import { ToastContainer, toast } from 'react-toastify'

function App() {

	const [entryCode, setEntryCode] = useState('')
	const [transpiledCode, setTrasnspiledCode] = useState('')

	useEffect(() => {
		document.title = "TRANSPILADOR DE LINGUAGENS"
	}, []);

	function transpile() {
		try {
			setTrasnspiledCode(new Transpiler(entryCode).transpile())
		} catch (e) {
			toast.warn(e.message)
			// alert(e.message)
		}
	}

	return (
		<>
			<div className='app'>
				<div className='card'>
					<div className='header'>
						<h1>TRANSPILADOR DE LINGUAGENS</h1>
					</div>
					<div className='content-grid'>
						<div className='input entry'>
							<label>ENTRADA</label>
							<textarea value={entryCode} onChange={e => setEntryCode(e.target.value)} />
						</div>
						<div className='transpile'>
							{
								<button className='button' onClick={e => transpile()}>
									<h1>{'>>'}</h1>
								</button>
							}
						</div>
						<div className='input entry'>
							<label>SAÍDA</label>
							<textarea value={transpiledCode} readOnly={true} />
						</div>
					</div>
				</div>
			</div>
			<ToastContainer />
		</>
	);
}

export default App;
