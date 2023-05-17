import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

	const [entryCode, setEntryCode] = useState('')

	useEffect(() => {
		document.title = "Transpilador de Linguagens"
	}, []);

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
						{/*<button onClick={e => transpile()}><h1>{'>>'}</h1></button>*/}
					</div>
					<div className='input vars'>
						<label>Variáveis</label>
						<div className='scrollable-area'>
							<table>
								<tbody>
									<tr>
										<th>Nome</th>
										<th>Tipo</th>
									</tr>
									{
										/*results && results.variables.map(v => {
											return (
												<tr key={v.name}>
													<td>{v.name}</td>
													<td>{v.type}</td>
												</tr>
											)
										})*/
									}
								</tbody>
							</table>
						</div>
					</div>
					<div className='input output'>
						<label>Palavras Reservadas</label>
						<div className='scrollable-area'>
							<table>
								<tbody>
									<tr>
										<th>Palavra</th>
										<th>Ocorrências</th>
									</tr>
									{
										/*results && results.reserved.sort((a, b) => a.name.length > b.name.length ? -1 : 1).map(r => {
											return (
												<tr key={r.name}>
													<td>{r.name}</td>
													<td>{r.count}</td>
												</tr>
											)
										})*/
									}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
