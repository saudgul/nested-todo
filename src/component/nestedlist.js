import React, { useState } from 'react';
import { Edit } from './updatenestedlist';
import { Card, CardTitle, CardSubtitle, CardBody, Button } from 'reactstrap';
const Nested = () => {
	const [inputList, setInputList] = useState([{ data: '' }]);
	const [alldata, setalldata] = useState([]);
	const [title, settitle] = useState('');
	const [modal, setmodal] = useState(false);
	const [updatealldata, setupdatealldata] = useState('');
	const [updateindex, setupdateindex] = useState('');
	const toggle = () => {
		setmodal(!modal);
	};
	const handlechange = e => {
		settitle(e.target.value);
	};
	const savedata = e => {
		e.preventDefault();
		let dataObj = {};
		dataObj['title'] = title;
		dataObj['taskdata'] = [...inputList];

		let temp = [...alldata];
		temp.push(dataObj);

		setalldata(temp);
		settitle(' ');

		setInputList([{ data: '' }]);
	};

	// handle input change
	const handleInputChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...inputList];
		list[index][name] = value;
		setInputList(list);
	};
	const deletedata = index => {
		const list = [...alldata];
		list.splice(index, 1);
		setalldata(list);
	};
	console.log('index u', updateindex);
	const updatedata = dataObj => {
		console.log('data obj', dataObj);
		// alldata[updateindex]=dataObj
		console.log('u index', updateindex);
		let tempdata = [...alldata];
		tempdata[updateindex] = dataObj;
		setalldata(tempdata);
	};
	const update = (data, index) => {
		console.log('update data', data);
		setupdateindex(index);

		setupdatealldata(data);
		toggle();
	};

	// handle click event of the Remove button
	const handleRemoveClick = index => {
		const list = [...inputList];
		list.splice(index, 1);
		setInputList(list);
	};

	// handle click event of the Add button
	const handleAddClick = () => {
		setInputList([...inputList, { data: '' }]);
		console.log(inputList);
	};
	return (
		<>
			<h1 className='header'>NESTED TODO LIST</h1>
			<div className='formdesign'>
				<form onSubmit={savedata}>
					<div>
						<div className='form-group'>
							<input
								type='text'
								className='form-control'
								placeholder='Title'
								onChange={handlechange}
								required
							/>
						</div>
					</div>

					{inputList.map((x, i) => {
						return (
							<>
								<div className='box d-flex'>
									<input
										name='data'
										placeholder='task'
										value={x.data}
										className='form-control'
										onChange={e => handleInputChange(e, i)}
										required
									/>

									{inputList.length !== 1 && (
										<button
											className='ml'
											onClick={() => handleRemoveClick(i)}
										>
											<i className='fas fa-minus-circle'></i>
										</button>
									)}

									{inputList.length - 1 === i && (
										<button
											className='ml'
											onClick={handleAddClick}
										>
											<span>
												<i className='fas fa-plus-circle'></i>
											</span>
										</button>
									)}
								</div>
								<div></div>
							</>
						);
					})}

					<div>
						{/* <button className="btnm" onClick={savedata}>
                    save data</button></div> */}
						<button className='btnm' type='submit'>
							SAVE DATA
						</button>
					</div>
				</form>
			</div>
			{alldata &&
				alldata.map((data, index) => {
					return (
						<>
							<Card className='carddesign'>
								<CardBody>
									<CardTitle tag='h3'>
										<h2 className='bg'>Title</h2>
										{data.title}
									</CardTitle>
									{data.taskdata.map((task, index) => {
										return (
											<CardSubtitle
												className='mb-2 text-muted '
												tag='h3'
											>
												<h3>Task:{index}</h3>
												{task.data}
											</CardSubtitle>
										);
									})}
									<Button
										color='primary'
										onClick={() => deletedata(index)}
									>
										Delete
									</Button>{' '}
									<Button
										color='primary'
										onClick={() => update(data, index)}
									>
										Update
									</Button>
								</CardBody>
							</Card>
						</>
					);
				})}

			<Edit
				modal={modal}
				toggle={toggle}
				update={updatedata}
				data={updatealldata}
			/>
		</>
	);
};

export default Nested;
